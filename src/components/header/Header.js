import React from "react";
import "./Header.css";
import logo from "./../images/logoImage.png";
import { Link } from "react-router-dom";
// import Contact from "../body-content/Contact";
// import App from "../../App";

function Header() {
  return (
    <header>
      <nav>
        <div className="logo">
          <img src={logo} alt="logo" className="logo" />
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
        </ul>
      </nav>
    </header>
  );
}

export default Header;
