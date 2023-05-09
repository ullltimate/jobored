import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './error-page.tsx';
import Favorites from './Favorites.tsx';
import SearchVacancy from './searchVacancy.tsx';
import Vacancy from './Vacancy.tsx';

const router = createBrowserRouter([
{ 
  path: "/",
  element: <App />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: "/",
      element: <SearchVacancy />,
    },
    {
      path: "favorites",
      element: <Favorites />,
    },
    {
      path: `/vacancy/:id`,
      element: <Vacancy />,
    },
  ],
},
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
