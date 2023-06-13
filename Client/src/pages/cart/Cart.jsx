import "./cart.css";
import NavBar from "../../components/navbar/NavBar";
import Announcement from "../../components/announcement/Announcement";
import Footer from "../../components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  removeProduct,
  addProductQuantity,
  subProductQuantity,
} from "../../redux/cartSlice";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";

const base_url = "https://lama-shop-307rishbah.vercel.app/api/";

const Cart = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    console.log("hello 3");

    const result = await axios.post(`${base_url}checkout/payment`);

    console.log("hello 4");

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_N9N2oegq4cg0HK", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Rishabh Corp.",
      description: "Test Transaction",
      image: "",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
        console.log("hello 5");

        const res = await axios.post(`${base_url}checkout/success`, data);

        console.log("hello 6");

        navigate("/success", {
          state: {
            razData: res.data,
            cart: cart,
          },
        });
      },
      prefill: {
        name: "rishabh",
        email: "rishabh@example.com",
        contact: "1234567890",
      },
      notes: {
        address: "Rishabh Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const handleCheckOut = (event) => {
    if (!userInfo) {
      navigate("/login");
    } else {
      displayRazorpay();
    }
  };

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
                    <RemoveIcon
                      onClick={() => dispatch(subProductQuantity(product._id))}
                    />
                    <div className="productAmount">{product.quantity}</div>
                    <AddIcon
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

            <button className="productButton" onClick={handleCheckOut}>
              CHECK OUT
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
