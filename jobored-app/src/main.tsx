import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './error-page.tsx';

const router = createBrowserRouter([
{ 
  path: "/",
  element: <App />,
  errorElement: <ErrorPage />
},
{ 
  path: "/favorites",
  element: <App />,
  errorElement: <ErrorPage />
}
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
