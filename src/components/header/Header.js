import React, { useState } from "react";
import "./Header.css";
import logo from "../../assets/images/logo.png";
import openIcon from "../../assets/images/icon-close.svg";
import closeIcon from "../../assets/images/icon-hamburger.svg";
import { NavLink } from "react-router-dom";

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

  const routes = [
    {id: 1, name: 'Home', path: '/'},
    {id: 2, name: 'Services', path: '/services'},
    {id: 3, name: 'Contact us', path: '/contact-us'},
    {id: 4, name: 'Place an order', path: '/order'},
  ]
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
          {
            routes.map(el => (
              <NavLink to={el.path} exact className="nav-item" activeClassName="page-active">
                <li  key={el.id}>
                  {el.name}
                </li>
              </NavLink>
            ))
          }
        </ul>
      </nav>
    </header>
  );
}

export default Header;
