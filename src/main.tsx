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
        path: "home",
        element: <Home />,
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
        path: "seller/products",
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
