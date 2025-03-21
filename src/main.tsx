import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './routes/Login.jsx';
import Signup from './routes/Signup.jsx';
import Dashboard from './routes/Dashboard.jsx';
import ProtectedRoute from './routes/ProtectedRoutes.jsx';
import UploadPoliza from './routes/UploadPoliza.jsx';
import PolizaControl from './routes/PolizaControl.jsx';
import Profile from './routes/Profile.jsx';
import { AuthProvider } from './auth/AuthProvider.jsx';
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
      },
      {
        path: "profile",
        element: <Profile/>,
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