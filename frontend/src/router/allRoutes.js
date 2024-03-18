import { appRoutes } from "./appRoutes";
import { authRoutes } from "./authRoutes";
import { adminRoutes} from "./adminRoutes";
import {UserDashboardRoute} from "./userDashBoard";

export const allRotues = [...authRoutes, ...appRoutes , ...adminRoutes , ...UserDashboardRoute];
