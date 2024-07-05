import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, RouterProvider, createRoutesFromElements } from 'react-router'
import {createBrowserRouter} from "react-router-dom"
import App from './App.jsx'
import "./index.css"

const router = createBrowserRouter(
  createRoutesFromElements(<Route path='/' element={<App/>} />)

);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);