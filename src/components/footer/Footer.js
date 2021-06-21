import React from "react";
import "./Footer.css";
import {Link} from "react-router-dom"
import logoImg from "../../assets/images/logo.png"
import facebook from "../../assets/images/icon-facebook.svg"
import twitter from "../../assets/images/icon-twitter.svg"
import instagram from "../../assets/images/icon-instagram.svg"

function Footer() {
  return (
    <footer>
      <div className="footer-section">
        <div className="logo-others">
          <img src={logoImg} alt="logo" />
          <ul className="nav-btm-items">
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
            <Link to="/login">Log In</Link>
            </li>
          </ul>
        </div>

        <div className="social-others">
          <div className="social">
            <img src={facebook} alt="facebook" className="icon" />
            <img src={twitter} alt="twitter" className="icon" />
            <img src={instagram} alt="instagram" className="icon" />
          </div>
          <p>&copy; All rights reserved.</p>
        </div>
      </div>
    </footer>

  );
}

export default Footer;
