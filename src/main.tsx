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

const SwitchBackgroundWrapper = ({ children }: any) => {
  const location = useLocation();

  useEffect(() => {
    const root = document.getElementById("root");
    const body = document.getElementsByTagName("body")[0];
    if (root && body) {
      if (
        location.pathname === "/client/sign-in" ||
        "/client/sign-up" ||
        "/seller/sign-in" ||
        "/seller/sign-up"
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
    element: <Layout />,
    errorElement: <Error />,
    children: [
      ///Client//////
      {
        path: "client/sign-up",
        element: (
          <SwitchBackgroundWrapper>
            <SignUpClient />
          </SwitchBackgroundWrapper>
        ),
      },
      {
        path: "client/sign-in",
        element: (
          <SwitchBackgroundWrapper>
            <SignInClient />
          </SwitchBackgroundWrapper>
        ),
      },
      {
        path: "client/profile",
        element:(
          <SwitchBackgroundWrapper>
            <ClientProfile />
          </SwitchBackgroundWrapper>
        ),
      },

      ///Seller//////
      {
        path: "seller/sign-up",
        element: (
          <SwitchBackgroundWrapper>
            <SignUpSeller />
          </SwitchBackgroundWrapper>
        ),
      },
      {
        path: "seller/sign-in",
        element: (
          <SwitchBackgroundWrapper>
            <SignInSeller />
          </SwitchBackgroundWrapper>
        ),
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
