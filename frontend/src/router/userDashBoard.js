// User Dashboard related routes
import UserDashboard from "../pages/user/account/userDashboars.jsx";
// cart related
import Cart from "../pages/user/cart.jsx";
// address related
import Address from "../pages/user/account/address/address.jsx";
import AddAddress from "../pages/user/account/address/addAddress.jsx";
import EditAddress from "../pages/user/account/address/editAddress.jsx";
// profile related
import Profile from "../pages/user/account/profile/profile.jsx";
import EditProfile from "../pages/user/account/profile/editProfile.jsx";
import ChangeCredentials from "../pages/user/account/profile/changeCredentials.jsx";
// Review related
import ReviewHistory from "../pages/user/account/review/reviewHistory.jsx";
import AddReview from "../pages/user/account/review/addReview.jsx";
// Order related
import OrderHistory from "../pages/user/account/order/orderHistory.jsx";

// wishlist related
import Wishlist from "../pages/user/account/wishlist/wishlist.jsx";
import PaymentMessage from "../pages/user/paymentMessage.jsx";

const auth = true;

export const UserDashboardRoute = [
  {
    id: "UserDashboard",
    path: "/user/dashboard",
    component: UserDashboard,
    layout: "userDashboard",
    requiredAuth: auth,
  },
  {
    id: "address",
    path: "/user/address",
    component: Address,
    layout: "userDashboard",
    requiredAuth: auth,
  },
  {
    id:"AddAddress",
    path:"/user/address/add",
    component:AddAddress,
    layout:"userDashboard",
    requiredAuth:auth
  },
  {
    id:"EditAddress",
    path:"/user/address/edit/:id",
    component:EditAddress,
    layout:"userDashboard",
    requiredAuth:auth
  },

  {
    id: "Profile",
    path: "/user/profile",
    component: Profile,
    layout: "userDashboard",
    requiredAuth: auth,
  },
  {
    id: "editProfile",
    path: "/user/profile/edit/:id",
    component: EditProfile,
    layout: "userDashboard",
    requiredAuth: auth,
  },
  
  {
    id: "ChangeCredentials",
    path: "/user/profile/password/:id",
    component: ChangeCredentials,
    layout: "userDashboard",
    requiredAuth: auth,
  },
  {
    id: "wishlist",
    path: "/user/wishlist",
    component: Wishlist,
    layout: "userDashboard",
    requiredAuth: auth,
  },
  {
    id: "OrderHistory",
    path: "/user/orderHistory",
    component: OrderHistory,
    layout: "userDashboard",
    requiredAuth: auth,
  },
  {
    id:"Review",
    path:"/user/Review",
    component:ReviewHistory,
    layout:"userDashboard",
    requiredAuth:auth
  },
  {
    id:"AddReview",
    path:"/user/Review/add",
    component:AddReview,
    layout:"userDashboard",
    requiredAuth:auth
  }
  ,
  {
    id:"AddReview",
    path:"/user/Cart",
    component:Cart,
    layout:"user",
    requiredAuth:auth
  },

  {
    id: "paymentSucess",
    path: "/user/order/paymentMessage/:paymentCode",
    component: PaymentMessage,
    layout: "user",
  }

  

];
