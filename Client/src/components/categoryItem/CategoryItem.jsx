import React from "react";
import "./categoryItem.css";
import { Link } from "react-router-dom";

const CategoryItem = ({ item }) => {
  return (
    <div className="categoryItemContainer">
      <Link to={`/products/${item.cat}`}>
        <img src={item.img} alt="" className="categoryItemImage" />
        <div className="categoryItemInfo">
          <h1 className="categoryItemTitle">{item.title}</h1>
          <button className="categoryItemButton">SHOW NOW</button>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
