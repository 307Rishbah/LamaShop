import React from "react";
import "./footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import PinterestIcon from "@mui/icons-material/Pinterest";
import RoomIcon from "@mui/icons-material/Room";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
  return (
    <div className="footerContainer">
      <div className="leftFooter">
        <h1 className="footerLogo">LAMA.</h1>
        <p className="footerdesc">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
        </p>
        <div className="footerSocial">
          <div className="socialIcon" style={{ color: "#3B5999" }}>
            <FacebookIcon />
          </div>
          <div className="socialIcon" style={{ color: "#E4405F" }}>
            <InstagramIcon />
          </div>
          <div className="socialIcon" style={{ color: "#55ACEE" }}>
            <TwitterIcon />
          </div>
          <div className="socialIcon" style={{ color: "#E60023" }}>
            <PinterestIcon />
          </div>
        </div>
      </div>
      <div className="centerFooter">
        <h3 className="footerCenterTitle">Useful Links</h3>
        <ul className="footerCenterList">
          <li className="footerCenterListItem">Home</li>
          <li className="footerCenterListItem">Cart</li>
          <li className="footerCenterListItem">My Fashion</li>
          <li className="footerCenterListItem">Woman Fashion</li>
          <li className="footerCenterListItem">Accessories</li>
          <li className="footerCenterListItem">My Account</li>
          <li className="footerCenterListItem">Order Tracking</li>
          <li className="footerCenterListItem">WishList</li>
          <li className="footerCenterListItem">Terms</li>
        </ul>
      </div>
      <div className="rightFooter">
        <h3 className="footerRightTitle">Contact</h3>
        <div className="footerContactItem">
          <RoomIcon style={{ marginRight: "10px" }} />
          622 Dixie Path, South Tobinchester 98336
        </div>
        <div className="footerContactItem">
          <PhoneIcon style={{ marginRight: "10px" }} />
          +1 234 567 89
        </div>
        <div className="footerContactItem">
          <MailOutlineIcon style={{ marginRight: "10px" }} />
          contact@lama.dev
        </div>
        <img
          src="https://i.ibb.co/Qfvn4z6/payment.png"
          alt=""
          className="footerPaymentImg"
        />
      </div>
    </div>
  );
};

export default Footer;
