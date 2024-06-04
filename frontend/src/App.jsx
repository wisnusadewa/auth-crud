import './App.css';
import Login from './Auth/login/Login.jsx';
import Register from './Auth/register/Register.jsx';
import Layout from './pages/Layout.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Dashboard from './pages/dashboard/Dashboard';
import Crud from './pages/crud/Crud';
import Edit from './pages/crud/Edit';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Dashboard />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/crud',
      element: <Crud />,
    },
    {
      path: '/edit/:id',
      element: <Edit />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
