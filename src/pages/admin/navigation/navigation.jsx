import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../../assets/images/logo.png'
import './navigation.scss'

const adminRoutes = [
  {id: 1, name: 'Dashboard', path:'/admin/dashboard', icon:'dashboard'},
  {id: 2, name: 'Orders', path:'/admin/orders', icon:'shop'},
] 

export const AdminNavigation = () => {
  function handleExitToClient () {
    window.location.href = '/'
  }
  return (
    <aside className="navigation">
      <div className="navigation-container">
        <div className="navigation-header">
          <img src={logo} alt="binabi_admin" />
        </div>
        <ul className="navigation-items">
          {
            adminRoutes.map((el) => (
              <NavLink className="navigation-item" activeClassName="active" to={el.path} key={el.id}>
                <li>
                  <span className="material-icons item-icon">
                    { el.icon }
                  </span>
                  <span className="item-name">
                    {el.name}
                  </span>
                </li>
              </NavLink>
            ))
          }
        </ul>
        <div className="exit-to-client">
          <p className="exit-action" onClick={handleExitToClient}>
            Exit to website
          </p>
        </div>
      </div>
    </aside>
  )
}