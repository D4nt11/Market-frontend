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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      ///Client//////
      {
        path: "client/sign-up",
        element: <SignUpClient />,
      },
      {
        path: "client/sign-in",
        element: <SignInClient />,
      },

      ///Seller//////
      {
        path: "seller/sign-up",
        element: <SignUpSeller />,
      },
      {
        path: "seller/sign-in",
        element: <SignInSeller />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router}></RouterProvider>
);

// const switchBackgrounnd = () => {
//   const root = document.getElementById("root");
//   const url = window.location.href;
//   url === "http://localhost:5173/client/sign-up"
//     ? (root.style.background = `var(--main-color)`)
//     : (root.style.background = `var(--background-color)`);
// };

// const location = useLocation();

// useEffect(() => {
//   const switchBackground = () => {
//     const root = document.getElementById("root");
//     console.log(root)
//     if (!root) return;
    
//     const backgroundColorMap: { [key: string]: string } = {
//       "http://localhost:5173/client/sign-up": "var(--main-color)",
//     };

//     root.style.backgroundColor =
//       backgroundColorMap[location.pathname] || "var(--background-color)";
//   };

//   switchBackground();
// }, [location]);
