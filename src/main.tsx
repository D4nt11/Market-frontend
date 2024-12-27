import { createRoot } from "react-dom/client";
import "./normalize.css";
import {
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Error from "./pages/Error/Error";
import SignUpClient from "./pages/Auth/SignUpClient/SignUpClient";
import SignUpSeller from "./pages/Auth/SignUpSeller/SignUpSeller";
import SignInClient from "./pages/Auth/SignInClient/SignInClient";
import SignInSeller from "./pages/Auth/SignInSeller/SignInSeller";
import { useEffect } from "react";
import ClientProfile from "./pages/Profile/ClientProfile/ClientProfile";
import SellerProfile from "./pages/Profile/SellerProfile/SellerProfile";
import SellerProducts from "./pages/SellerProducts/SellerProducts";
import Home from "./pages/Home/Home";
import Catalog from "./pages/Catalog/Catalog";
import SellerCatalog from "./pages/SellerCatalog/SellerCatalog";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import Cart from "./pages/Cart/Cart";

const SwitchBackgroundWrapper = ({ children }: any) => {
  const location = useLocation();

  useEffect(() => {
    const root = document.getElementById("root");
    const body = document.getElementsByTagName("body")[0];
    if (root && body) {
      if (
        location.pathname === "/client/sign-in" ||
        location.pathname === "/client/sign-up" ||
        location.pathname === "/seller/sign-in" ||
        location.pathname === "/seller/sign-up"
      ) {
        root.style.backgroundColor = `var(--main-color)`;
        body.style.backgroundColor = `var(--main-color)`;
      } else {
        root.style.backgroundColor = `var(--background-color)`;
        body.style.backgroundColor = `var(--background-color)`;
      }
    }
  }, [location]);

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
    <SwitchBackgroundWrapper>
    <Layout />
    </SwitchBackgroundWrapper>),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "catalog",
        element: <Catalog />,
      },
      {
        path: "catalog/seller",
        element: <SellerCatalog />
      },
      {
        path: 'products/:id',
        element: <SingleProduct />
      },

      ///Client//////
      {
        path: "client/sign-up",
        element: (
            <SignUpClient />
        ),
      },
      {
        path: "client/sign-in",
        element: (
            <SignInClient />
        ),
      },
      {
        path: "client/profile",
        element:(
            <ClientProfile />
        ),
      },
      {
        path: "client/cart",
        element: <Cart />,
      },

      ///Seller//////
      {
        path: "seller/sign-up",
        element: (
            <SignUpSeller />
        ),
      },
      {
        path: "seller/sign-in",
        element: (
            <SignInSeller />
        ),
      },
      {
        path: "seller/profile",
        element:(
            <SellerProfile />
        ),
      },
      {
        path: "seller/products/:id",
        element:(
            <SellerProducts />
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
