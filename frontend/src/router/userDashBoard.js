import UserDashboard from "../pages/user/account/userDashboars.jsx";
import Address from "../pages/user/account/address.jsx";
import Profile from "../pages/user/account/profile.jsx";
import OrderHistory from "../pages/user/account/orderHistory.jsx";
import ReviewHistory from "../pages/user/account/reviewHistory.jsx";
import AddReview from "../pages/user/account/addReview.jsx";
import Cart from "../pages/user/cart.jsx";




export const UserDashboardRoute = [
  {
    id: "UserDashboard",
    path: "/user/dashboard",
    component: UserDashboard,
    layout: "userDashboard",
    requiredAuth: false,
  },
  {
    id: "address",
    path: "/user/address",
    component: Address,
    layout: "userDashboard",
    requiredAuth: false,
  },
  {
    id: "Profile",
    path: "/user/profile",
    component: Profile,
    layout: "userDashboard",
    requiredAuth: false,
  },
  {
    id: "OrderHistory",
    path: "/user/orderHistory",
    component: OrderHistory,
    layout: "userDashboard",
    requiredAuth: false,
  },
  {
    id:"Review",
    path:"/user/Review",
    component:ReviewHistory,
    layout:"userDashboard",
    requiredAuth:false
  },
  {
    id:"AddReview",
    path:"/user/Review/add",
    component:AddReview,
    layout:"userDashboard",
    requiredAuth:false
  }
  ,
  {
    id:"AddReview",
    path:"/user/Cart",
    component:Cart,
    layout:"user",
    requiredAuth:false
  }

];
