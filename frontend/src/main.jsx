import React from "react";
import ReactDOM from "react-dom/client";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import App from "./App.jsx";
import Login from "./pages/Auth/Login.jsx";
import "./index.css";
import Signup from "./pages/Auth/Signup";
import PrivetRoute from "./components/PrivetRoute";
import Profile from "./pages/User/Profile.jsx";
import UserList from "./pages/Admin/UserList.jsx";
import AdminRoute from "./pages/Admin/AdminRoute.jsx";
import Category from "./pages/Admin/Category";
import Products from "./pages/Admin/Products.jsx";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import CreateProduct from "./pages/Admin/CreateProduct.jsx";
import Home from "./components/Home";
import Favorites from "./pages/Products/Favorites";
import ProductsDetails from "./pages/Products/ProductsDetails.jsx";
import Carts from "./pages/User/Carts.jsx";
import Shop from "./pages/Products/Shop.jsx";
import Shipping from "./pages/Order/Shipping";
import Placeorder from "./pages/Order/Placeorder.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Order from "./pages/Order/Order.jsx";
import OrderList from "./pages/Admin/OrderList.jsx";
import UserOrder from "./pages/Order/UserOrder.jsx";
import Dashborard from "./pages/Admin/Dashborard";
import Error from "./pages/Error";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<PrivetRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/placeorder" element={<Placeorder />} />
        <Route path="/order/:orderId" element={<Order />} />
        <Route path="/userOrder" element={<UserOrder />} />
      </Route>

      {/* admin routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="users" element={<UserList />} />
        <Route path="category" element={<Category />} />
        <Route path="products" element={<Products />} />
        <Route path="product-create" element={<CreateProduct />} />
        <Route path="update/:productId" element={<UpdateProduct />} />
        <Route path="orderList" element={<OrderList />} />
        <Route path="dashboard" element={<Dashborard />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route index={true} path="/" element={<Home />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/cart" element={<Carts />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/productDetails/:productId" element={<ProductsDetails />} />

      {/* 404 route  */}
      <Route path="*" element={<Error />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
