import React, { useEffect, useState } from "react";
import "./cart.css";
import NavBar from "../../components/navbar/NavBar";
import Announcement from "../../components/announcement/Announcement";
import Footer from "../../components/footer/Footer";
import { Add, Remove } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../../requestMethods";
import {
  removeProduct,
  addProductQuantity,
  subProductQuantity,
  resetCart,
} from "../../redux/cartSlice";

const KEY = process.env.REACT_APP_STRIPE;

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const [stripeToken, setStripeToken] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total,
        });
        navigate("/success", {
          stripeData: res.data,
          products: cart,
        });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, cart, navigate]);

  return (
    <div className="cartContainer">
      <NavBar />
      <Announcement />

      <div className="cartWrapperContainer">
        <h1 className="cart-Title">YOUR BAG</h1>
        <div className="cartTop">
          <button
            className="cartTopbutton"
            style={{ backgroundColor: "transparent" }}
            onClick={() => dispatch(resetCart())}
          >
            CONTINUE SHOPPING
          </button>

          <div className="cartTopTexts">
            <span className="cartTopText">Shopping Bag(2)</span>
            <span className="cartTopText">Your Wishlist(0)</span>
          </div>
          <button className="cartTopbutton">CHECKOUT NOW</button>
        </div>
        <div className="cartBottom">
          <div className="cartBottomInfo">
            {cart.products.map((product) => (
              <div className="cartProduct">
                <div className="cartProductDetails">
                  <img src={product.img} alt="" className="productImg" />
                  <div className="productDetails">
                    <span className="productName">
                      <b>Product:</b>
                      {product.title}
                    </span>
                    <span className="productId">
                      <b>ID:</b>
                      {product._id}
                    </span>
                    <div
                      className="productColor"
                      style={{ backgroundColor: `${product.color}` }}
                    ></div>
                    <span className="productSize">
                      <b>Size:</b>
                      {product.size}
                    </span>
                  </div>
                </div>
                <div className="cartPriceDetails">
                  <div className="productAmountContainer">
                    <Remove
                      onClick={() => dispatch(subProductQuantity(product._id))}
                    />
                    <div className="productAmount">{product.quantity}</div>
                    <Add
                      onClick={() => dispatch(addProductQuantity(product._id))}
                    />
                  </div>
                  <div className="product-Price">
                    Rs. {product.price * product.quantity}
                  </div>
                  <button
                    className="productRemove"
                    onClick={() => dispatch(removeProduct(product))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <hr />
          </div>

          <div className="cartBottomSummary">
            <h1 className="productSummaryTitle">ORDER SUMMARY</h1>
            <div className="productSummaryItem">
              <span className="summaryItemText">Subtotal</span>
              <span className="summaryItemPrice">Rs. {cart.total}</span>
            </div>
            <div className="productSummaryItem">
              <span className="summaryItemText">Estimated Shipping</span>
              <span className="summaryItemPrice">Rs. 100</span>
            </div>
            <div className="productSummaryItem">
              <span className="summaryItemText">Shipping Discount</span>
              <span className="summaryItemPrice">Rs. -100</span>
            </div>
            <div
              className="productSummaryItem"
              style={{
                fontWeight: "500",
                fontSize: "24px",
              }}
            >
              <span className="summaryItemText">Total</span>
              <span className="summaryItemPrice">Rs. {cart.total}</span>
            </div>
            <StripeCheckout
              name="Lama Shop"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`Your total is Rs.${cart.total}`}
              amount={cart.total}
              token={onToken}
              stripeKey={KEY}
            >
              <button className="productButton">CHECK OUT</button>
            </StripeCheckout>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
