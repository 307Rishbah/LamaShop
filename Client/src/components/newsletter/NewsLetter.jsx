import React from "react";
import SendIcon from "@mui/icons-material/Send";
import "./newsLetter.css";

const NewsLetter = () => {
  return (
    <div className="newsContainer">
      <h1 className="newsTitle">Newsletter</h1>
      <div className="newsDesc">
        Get timely updates from your favorite products.
      </div>
      <div className="newsInputContainer">
        <input type="text" className="newsInput" placeholder="Your email" />
        <button className="newsButton">
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
