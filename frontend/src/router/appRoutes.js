import Home from "../pages/index.jsx";
import Product from "../pages/productPage.jsx";
import ProductDescription from "../pages/description.jsx";
import Test from "../pages/test.jsx";

export const appRoutes = [
  {
    id: "home",
    path: "/",
    component: Home,
    layout: "user",
    requiredAuth: false,
  },
  {
    id: "product",
    path: "/product",
    component: Product,
    layout: "user",
    requiredAuth: false,
  },
  {
    id: "productDescription",
    path: "/productDescription",
    component: ProductDescription,
    layout: "user",
    requiredAuth: false,
  },

  {
    id: "test",
    path: "/test",
    component: Test,
    // layout: "user",
    requiredAuth: false,
  },
];
