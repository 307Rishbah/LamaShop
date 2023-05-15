import React from "react";
import "./product.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link } from "react-router-dom";

const Product = ({ item }) => {
  return (
    <div className="productContainer">
      <div className="productCircle"></div>
      <img src={item.img} alt="" className="productImg" />
      <div className="productInfo">
        <div className="productIcon">
          <ShoppingCartOutlinedIcon />
        </div>
        <div className="productIcon">
          <Link to={`/product/${item._id}`}>
            <SearchOutlinedIcon />
          </Link>
        </div>
        <div className="productIcon">
          <FavoriteBorderOutlinedIcon />
        </div>
      </div>
    </div>
  );
};

export default Product;
