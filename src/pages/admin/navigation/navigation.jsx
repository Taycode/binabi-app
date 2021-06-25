import React from 'react'
import logo from '../../../assets/images/logo.png'
import './navigation.scss'

const adminRoutes = [
  {name: 'Dashboard', path:'/dashboard', icon:'dashboard'},
  {name: 'Orders', path:'/orders', icon:'shop'},
] 

export const AdminNavigation = () => {
  return (
    <aside className="navigation">
      <div>
        <img src={logo} alt="binabi_admin" />
      </div>
      <ul>
        {
          adminRoutes.map((el) => <li> {el.name} </li>)
        }
      </ul>
    </aside>
  )
}