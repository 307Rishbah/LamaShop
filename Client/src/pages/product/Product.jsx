import React, { useEffect, useState } from "react";
import "./product.css";
import NavBar from "../../components/navbar/NavBar";
import Announcement from "../../components/announcement/Announcement";
import NewsLetter from "../../components/newsletter/NewsLetter";
import Footer from "../../components/footer/Footer";
import { Add, Remove } from "@material-ui/icons";
import { useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import axios from "axios";

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/products/find/" + id
        );
        setProduct(res.data);
      } catch (err) {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "sub") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(
      addProduct({
        ...product,
        quantity,
        color,
        size,
      })
    );
  };

  return (
    <div>
      <NavBar />
      <Announcement />
      <div className="productWrapper">
        <div className="productImageContainer">
          <img src={product.img} alt="" className="productImage" />
        </div>
        <div className="productInfoContainer">
          <h1 className="productText">{product.title}</h1>
          <p className="productDescription">{product.desc}</p>
          <span className="productPrice">Rs. {product.price}</span>
          <div className="productFilterContainer">
            <div className="productFilter">
              <span className="productFilterTitle">Color </span>
              {product.color?.map((c) => (
                <div
                  className="productFilterColor"
                  key={c}
                  style={{ backgroundColor: `${c}` }}
                  selected
                  onClick={() => setColor(c)}
                ></div>
              ))}
            </div>
            <div className="productFilter">
              <span className="productFilterTitle">Size</span>

              <select
                name=""
                id=""
                defaultValue={size}
                onChange={(e) => setSize(e.target.value)}
                className="productFilterSize"
              >
                {product.size?.map((s) => (
                  <option
                    selected
                    value={s}
                    key={s}
                    className="filterSizeoption"
                  >
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="productAddContainer">
            <div className="productAmountContainer">
              <Remove onClick={() => handleQuantity("sub")} />
              <span className="productAmount">{quantity}</span>
              <Add onClick={() => handleQuantity("add")} />
            </div>
            <button className="productCartButton" onClick={handleClick}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Product;
