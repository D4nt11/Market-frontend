import { createRoot } from 'react-dom/client'
import './normalize.css'
import { RouterProvider, createBrowserRouter} from 'react-router-dom'
import Layout from './pages/Layout/Layout'
import Error from './pages/Error/Error'
import SignUpClient from './pages/Auth/SignUpClient/SignUpClient'
import SignUpSeller from './pages/Auth/SignUpSeller/SignUpSeller'




const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: 'client/sign-up',
        element: <SignUpClient />
      },
      {
        path: 'seller/sign-up',
        element: <SignUpSeller />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}></RouterProvider>
)
