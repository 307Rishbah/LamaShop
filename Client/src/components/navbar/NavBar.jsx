import "./navbar.css";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/authSlice";

const NavBar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <div className="navbarLeft">
          <span className="language">EN</span>
          <div className="searchContainer">
            <input type="text" />
            <SearchIcon
              style={{
                color: "grey",
                fontsize: 16,
              }}
            />
          </div>
        </div>
        <div className="navbarCenter">
          <h1>LAMA.</h1>
        </div>
        <div className="navbarRight">
          {!userInfo && (
            <>
              <Link to={"/register"} className="link">
                <div className="menuItem">REGISTER</div>
              </Link>
              <Link to={"/login"} className="link">
                <div className="menuItem">SIGNUP</div>
              </Link>
            </>
          )}
          {userInfo && (
            <div className="menuItem link" onClick={handleLogout}>
              LOGOUT
            </div>
          )}
          <Link to={"/cart"}>
            <div className="menuItem">
              <Badge badgeContent={userInfo ? quantity : null} color="primary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
