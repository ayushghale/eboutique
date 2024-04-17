import Dashboard from "../pages/admin/dashboard.jsx";
import FormElements from "../pages/admin/forms.jsx";

import AddProduct from "../pages/admin/product/addProduct.jsx";
import DisplayProduct from "../pages/admin/product/displayProduct.jsx";

// category
import AddCategory from "../pages/admin/category/addCategory.jsx";
import DisplayCategory from "../pages/admin/category/displayCategory.jsx";
import DisplayOrder from "../pages/admin/order/order.jsx";
import AddBorder from "../pages/admin/customize/addBorder.jsx";
import DisplayBorder from "../pages/admin/customize/displayBorder.jsx";
import AddDesign from "../pages/admin/customize/addDesign.jsx";
import DisplayDesign from "../pages/admin/customize/displayDesign.jsx";
import SalesReport from "../pages/admin/report/salesReport.jsx";
import OrderReport from "../pages/admin/report/orderReport.jsx";
import SignIn from "../pages/admin/auth/signIn.jsx";

export const adminRoutes = [

  // admin signin
  {
    id: "adminSignIn",
    path: "/admin/signin",
    component: SignIn,
    // layout: "auth",
  },

  // admin signup
  {
    id: "adminSignUp",
    path: "/admin/signup",
    component: SignIn,
    // layout: "auth",

  },

  // admin routes
  // dashboard routes
  {
    id: "dashboard",
    path: "/admin/dashboard",
    component: Dashboard,
    layout: "admin",
    requiredAuth: false,
  },
  {
    id: "formElements",
    path: "/admin/forms",
    component: FormElements,
    layout: "admin",
    requiredAuth: false,
  },
  // porduct routes
  {
    id: "addProduct",
    path: "/admin/product/add",
    component: AddProduct,
    layout: "admin",
    requiredAuth: false,
  },
  {
    id: "displayProduct",
    path: "/admin/product/display",
    component: DisplayProduct,
    layout: "admin",
    requiredAuth: false,
  },
  // category routes
  // add category
  {
    id: "category",
    path: "/admin/Category/add",
    component: AddCategory,
    layout: "admin",
    requiredAuth: false,
  },
  // display category
  {
    id: "displayCategory",
    path: "/admin/Category/display",
    component: DisplayCategory,
    layout: "admin",
    requiredAuth: false,
  },
  // edit category
  {
    id: "editCategory",
    path: "/admin/Category/edit/:id",
    component: AddCategory,
    layout: "admin",
    requiredAuth: false,
  },
  // border routes
  {
    id: "addBorder",
    path: "/admin/border/add",
    component: AddBorder,
    layout: "admin",
    requiredAuth: false,
  },
  {
    id: "displayBorder",
    path: "/admin/border/display",
    component: DisplayBorder,
    layout: "admin",
    requiredAuth: false,
  },
  {
    id: "editBorder",
    path: "/admin/border/edit/:id",
    component: AddBorder,
    layout: "admin",
    requiredAuth: false,
  },

  // design routes
  {
    id: "addDesign",
    path: "/admin/design/add",
    component: AddDesign,
    layout: "admin",
    requiredAuth: false,
  },
  {
    id: "displayDesign",
    path: "/admin/design/display",
    component: DisplayDesign,
    layout: "admin",
    requiredAuth: false,
  },
  {
    id: "editDesign",
    path: "/admin/design/edit/:id",
    component: AddDesign,
    layout: "admin",
    requiredAuth: false,
  },

  // order routes
  {
    id: "displayOrder",
    path: "/admin/order/display",
    component: DisplayOrder,
    layout: "admin",
    requiredAuth: false,
  },

  // report routes
  // sales report
  {
    id: "salesReport",
    path: "/admin/report/sales",
    component: SalesReport,
    layout: "admin",
    requiredAuth: false,
  },
  // order report
  {
    id: "productReport",
    path: "/admin/report/order",
    component: OrderReport,
    layout: "admin",
    requiredAuth: false,
  },
];
