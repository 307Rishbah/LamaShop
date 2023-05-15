import React from "react";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import Cart from "./pages/cart/Cart";
import { Success } from "./pages/success/Success";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/products/:category" element={<ProductList />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
};
