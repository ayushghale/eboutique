import Login from "../pages/auth/loginRegister.jsx";

export const authRoutes = [
  {
    id: "auth_login",
    path: "/login",
    component: Login,
    hasLayout: false,
    requiredAuth: false,
  },
];
