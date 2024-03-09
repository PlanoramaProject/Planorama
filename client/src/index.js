import React from 'react';
import './index.css';
import App from './App';
import reactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./client/components/Profile";
import Event from "././client/components/Event";



const router = createBrowserRouter([
    {
      path: "/",
      element: <App />
    },
    {
      path: "/profile",
      element: <Profile />
    },
    {
      path: "/events/:id",
      element: <Event />
    }
])

reactDOM.createRoot(document.getElementById("root")).render(
        <RouterProvider router={router} />
);


