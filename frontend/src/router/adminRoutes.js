import Dashboard from "../pages/admin/dashboard.jsx";
import FormElements from "../pages/admin/forms.jsx";

import AddProduct from "../pages/admin/product/addProduct.jsx";
import DisplayProduct from "../pages/admin/product/displayProduct.jsx";

// category
import AddCategory from "../pages/admin/category/addCategory.jsx";
import DisplayCategory from "../pages/admin/category/displayCategory.jsx";


export const adminRoutes = [
  {
    id: "dashboard",
    path: "/dashboard",
    component: Dashboard,
    layout: "admin",
    requiredAuth: false,
  },
  {
    id: "formElements",
    path: "/formElements",
    component: FormElements,
    layout: "admin",
    requiredAuth: false,
  },
  // porduct routes
  {
    id: "addProduct",
    path: "/addProduct",
    component: AddProduct,
    layout: "admin",
    requiredAuth: false,
  },
  {
    id: "displayProduct",
    path: "/displayProduct",
    component: DisplayProduct,
    layout: "admin",
    requiredAuth: false,
  },

  //category routes
  {
    id:"category",
    path:"/addCategory",
    component:AddCategory,
    layout:"admin",
    requiredAuth:false
  }
  ,
  {
    id:"displayCategory",
    path:"/displayCategory",
    component:DisplayCategory,
    layout:"admin",
    requiredAuth:false
  },
 
];
