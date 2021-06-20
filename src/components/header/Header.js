import React, { useState } from "react";
import "./Header.css";
import logo from "../../assets/images/logo.png";
import openIcon from "../../assets/images/icon-close.svg";
import closeIcon from "../../assets/images/icon-hamburger.svg";
import { Link } from "react-router-dom";

function Header() {
  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    const navBar = e.target;

    if (!open) {
      navBar.classList.add("active");
    } else {
      navBar.classList.remove("active");
    }
    setOpen(!open);
    console.log(navBar);
  };

  return (
    <header className="header">
      <nav>
        <div className="logo-section">
          <img src={logo} alt="logo" className="logo" />
          <img
            src={open ? openIcon : closeIcon}
            alt="close-icon"
            className="open"
            onClick={handleClick}
          />
        </div>

        <ul className="nav-items">
          <li className="nav-item">
            <Link to="/"> Home </Link>
          </li>
          <li className="nav-item">
            <Link to="/service">Service</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="nav-item">
            <Link to="/placeorder">Place an Order</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
