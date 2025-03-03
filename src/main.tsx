import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './routes/Login.js';
import Signup from './routes/Signup.js';
import Dashboard from './routes/Dashboard.js';
import ProtectedRoute from './routes/ProtectedRoutes.js';
import UploadPoliza from './routes/UploadPoliza.js';
import PolizaControl from './routes/PolizaControl.js';
import { AuthProvider } from './auth/AuthProvider.js';
import './css/bootstrap.css';
import './css/styles.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/protected",
    element: <ProtectedRoute />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path:"upload",
        element: <UploadPoliza />,
      },
      {
      path:"poliza-control",
      element: <PolizaControl />,
      }
    ]
  },
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)