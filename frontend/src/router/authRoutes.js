import Login from "../pages/auth/loginRegister.jsx";
import EmailVerification from "../pages/auth/emailVerification.jsx";
import ForgetPassword from "../pages/auth/forgetPassword.jsx";
import OtpVerification from "../pages/auth/otpVerification.jsx";
import ChangePassword from "../pages/auth/changePassword.jsx";

export const authRoutes = [
  {
    id: "auth_login",
    path: "/login",
    component: Login,
    hasLayout: false,
    requiredAuth: false,
  },
  {
    id: "EmailVerification",
    path: "/EmailVerification",
    component: EmailVerification,
    hasLayout: false,
    requiredAuth: false,
  },

  {
    id: "OtpVerification",
    path: "/OtpVerification/:token",
    component: OtpVerification,
    hasLayout: false,
    requiredAuth: false,
  },
  {
    id: "ChangePassword",
    path: "/ChangePassword/:token",
    component: ChangePassword,
    hasLayout: false,
    requiredAuth: false,
  },
];
