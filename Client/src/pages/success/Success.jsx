import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useLocation } from "react-router-dom";
import { resetCart } from "../../redux/cartSlice";

export const Success = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { orderId, paymentId, msg } = location.state.razData;
  const cart = location.state.cart;
  const { userInfo, userToken } = useSelector((state) => state.auth);
  console.log(userToken);

  const dispatch = useDispatch();

  useEffect(() => {
    const createOrder = async () => {
      try {
        await axios.post("http://localhost:8080/api/orders", {
          userId: userInfo._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          orderId,
          paymentId,
          status: msg,
        });
        setLoading(false);
        dispatch(resetCart());
      } catch (error) {
        console.log(error);
      }
    };
    createOrder();
  }, [cart, userInfo, orderId, paymentId, msg, dispatch, userToken]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!loading
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <Link to={"/"}>
        <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
      </Link>
    </div>
  );
};
