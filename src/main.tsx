import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter} from 'react-router-dom'
import Layout from './pages/Layout/Layout'
import Error from './pages/Error/Error'




const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: 'auth',
        element:
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}></RouterProvider>
)
