import { BrowserRouter,  Route, Routes } from "react-router-dom";

import HomeLayout from "../layout/homeLayout.jsx";
import UserDashboard from "../layout/user/userDashboard.jsx";
import { allRotues } from "./allRoutes";
import { Fragment } from "react";
import AuthWrapper from "./AuthChecker";
import AdminLayout from "../layout/admin/AdminLayout.jsx";
import NotFound from "../pages/message/notFound.jsx";
import { ThemeProvider } from "next-themes";

function MainWrapper({ route, children }) {
  const PrivateWrapper = route.requiredAuth ? AuthWrapper : Fragment;

  if (route.layout === "admin") {
    return (
      <ThemeProvider>
        <PrivateWrapper>
          <AdminLayout>{children}</AdminLayout>
        </PrivateWrapper>
      </ThemeProvider>
    );
  } else if (route.layout === "user") {
    return (
      <PrivateWrapper>
        <HomeLayout>{children}</HomeLayout>
      </PrivateWrapper>
    );
  }else if (route.layout === "userDashboard") {
    return (
      <PrivateWrapper>
        <UserDashboard>{children}</UserDashboard>
      </PrivateWrapper>
    );
  } else {
    return (
        <PrivateWrapper>{children}</PrivateWrapper>
    );
  }

}

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {allRotues.map((route) => {
          return (
            <Route
              key={route.id}
              path={route.path}
              element={
                <MainWrapper route={route}>
                  <route.component />
                </MainWrapper>
              }
            />
            
          );
        })}
         <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
