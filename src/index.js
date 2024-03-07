import React from 'react';
import './index.css';
import App from './App';
import reactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./client/components/Profile"



const router = createBrowserRouter([
    {
      path: "/",
      element: <App />
    },
    {
      path: "/profile",
      element: <Profile />
  }
])

reactDOM.createRoot(document.getElementById("root")).render(
        <RouterProvider router={router} />
);


