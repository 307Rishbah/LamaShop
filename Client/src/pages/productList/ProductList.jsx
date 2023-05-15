import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import Announcement from "../../components/announcement/Announcement";
import Products from "../../components/products/Products";
import NewsLetter from "../../components/newsletter/NewsLetter";
import Footer from "../../components/footer/Footer";
import "./productList.css";

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilter] = useState({});
  const [sort, setSort] = useState("Newest");

  const handleFiters = (event) => {
    const value = event.target.value;
    setFilter({ ...filters, [event.target.name]: value });
  };

  const handleSort = (e) => setSort(e.target.value);

  return (
    <div className="productListContainer">
      <NavBar />
      <Announcement />
      <h1 className="productList-Text">{cat}</h1>
      <div className="productListFilterContainer">
        <div className="productListFilter">
          <span className="filterText">Filter Products:</span>
          <select
            name="color"
            id=""
            className="selectFilter"
            onChange={handleFiters}
          >
            <option value="Color" className="optionItem" disabled>
              Color
            </option>
            <option value="White" className="optionItem">
              White
            </option>
            <option value="Black" className="optionItem">
              Black
            </option>
            <option value="Red" className="optionItem">
              Red
            </option>
            <option value="Yello" className="optionItem">
              Yellow
            </option>
            <option value="Green" className="optionItem">
              Green
            </option>
          </select>
          <select
            name="size"
            id=""
            className="selectFilter"
            onChange={handleFiters}
          >
            <option value="Size" className="optionItem" disabled>
              Size
            </option>
            <option value="XS" className="optionItem">
              XS
            </option>
            <option value="S" className="optionItem">
              S
            </option>
            <option value="M" className="optionItem">
              M
            </option>
            <option value="L" className="optionItem">
              L
            </option>
            <option value="XL" className="optionItem">
              XL
            </option>
          </select>
        </div>
        <div className="productListFilter">
          <span className="filterText">Sort Products:</span>
          <select
            name="sort"
            id=""
            className="selectFilter"
            onChange={handleSort}
          >
            <option value="newest" className="optionItem" selected>
              Newest
            </option>
            <option value="asc" className="optionItem">
              Price(asc)
            </option>
            <option value="desc" className="optionItem">
              Price(desc)
            </option>
          </select>
        </div>
      </div>
      <Products cat={cat} filters={filters} sort={sort} />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default ProductList;
