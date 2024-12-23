import { createRoot } from 'react-dom/client'
import './normalize.css'
import { RouterProvider, createBrowserRouter} from 'react-router-dom'
import Layout from './pages/Layout/Layout'
import Error from './pages/Error/Error'
import SignUpClient from './pages/Auth/SignUpClient/SignUpClient'
import SignUpSeller from './pages/Auth/SignUpSeller/SignUpSeller'
import SignInClient from './pages/Auth/SignInClient/SignInClient'
import SignInSeller from './pages/Auth/SignInSeller/SignInSeller'


 

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      ///Client//////
      {
        path: 'client/sign-up',
        element: <SignUpClient />
      },
      {
        path: 'client/sign-in',
        element: <SignInClient />,
      },

      ///Seller//////
      {
        path: 'seller/sign-up',
        element: <SignUpSeller />
      },
      {
        path: 'seller/sign-in',
        element: <SignInSeller />,
      },
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}></RouterProvider>
)
