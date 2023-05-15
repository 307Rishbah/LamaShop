import React from "react";
import Announcement from "../../components/announcement/Announcement";
import Categories from "../../components/categories/Categories";
import NavBar from "../../components/navbar/NavBar";
import Slider from "../../components/slider/Slider";
import Products from "../../components/products/Products";
import NewsLetter from "../../components/newsletter/NewsLetter";
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (
    <>
      <Announcement />
      <NavBar />
      <Slider />
      <Categories />
      <Products />
      <NewsLetter />
      <Footer />
    </>
  );
};

export default Home;
