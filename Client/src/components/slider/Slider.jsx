import React, { useState } from "react";
import "./slider.css";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { sliderItems } from "../../data";

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      console.log("Left");
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      console.log("Right");
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };
  return (
    <div className="sliderContainer">
      <div
        className="arrow"
        direction="left"
        style={{ left: "10px" }}
        onClick={() => handleClick("left")}
      >
        <ArrowLeftOutlinedIcon />
      </div>
      <div
        className="slideWrapper"
        slideIndex={slideIndex}
        style={{ transform: `translateX(${slideIndex * -100}vw)` }}
      >
        {sliderItems.map((item) => (
          <div
            className="Slide"
            style={{ backgroundColor: item.bg }}
            key={item.id}
          >
            <div className="ImgContainer">
              <img src={item.img} alt="" className="slideImage" />
            </div>
            <div className="InfoContainer">
              <h1 className="sliderTitle">{item.title}</h1>
              <p className="sliderDesc">{item.desc}</p>
              <button className="sliderButton">SHOW NOW</button>
            </div>
          </div>
        ))}
      </div>
      <div
        className="arrow"
        direction="right"
        style={{ right: "10px" }}
        onClick={() => handleClick("right")}
      >
        <ArrowRightOutlinedIcon />
      </div>
    </div>
  );
};

export default Slider;
