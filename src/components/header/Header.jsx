import React, { useState } from "react";
import "./Header.css";
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";

function Header() {
  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    setOpen(!open);
  };

  const routes = [
    {id: '1a', name: 'Home', path: '/'},
    {id: '2a', name: 'Services', path: '/services'},
    {id: '3a', name: 'Contact us', path: '/contact-us'},
    {id: '4a', name: 'Place an order', path: '/order'},
  ]
  return (
    <header className="header">
      <nav>
        <div className="logo-section">
          <img src={logo} alt="logo" className="logo" />
        </div>

        <ul className={`nav-items ${open && 'menu-focused'}`}>
          <div className="nav-header">
            <img src={logo} alt="logo" className="logo" />
            <div onClick={handleClick} className="menu-close">
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
          {
            routes.map(el => (
              <NavLink key={el.id} to={el.path} exact className="nav-item-link" activeClassName="page-active">
                <li className="nav-item">
                  {el.name}
                </li>
              </NavLink>
            ))
          }
        </ul>

        <div className="menu-toggle" onClick={handleClick}>
          <FontAwesomeIcon icon={faBars} />
        </div>

      </nav>
    </header>
  );
}

export default Header;
