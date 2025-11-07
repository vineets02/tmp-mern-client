import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import Home from './pages/Home'
import Originals from './pages/Originals'
import ShowDetail from './pages/ShowDetail'
import AdminDashboard from './pages/admin/Dashboard'
import AdminLogin from './pages/admin/Login'
import Contact from './pages/Contact'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'originals', element: <Originals /> },
      { path: "contact", element: <Contact /> },
      { path: 'originals/:slug', element: <ShowDetail /> },
        { path: 'admin', element: <AdminDashboard /> },
        { path: 'admin/login', element: <AdminLogin /> }
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
