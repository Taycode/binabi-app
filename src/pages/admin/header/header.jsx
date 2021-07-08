import React from 'react'
import Admin from '../../../helpers/admin'
import './header.scss'

const SearchBox = () => {
  return (
    <div className="search-box">
      <div className="field">
        <input type="search" className="text-box" placeholder="Enter a Keyword" />
      </div>
    </div>
  )
}

export const AdminHeader = ({email, onOpenSideNav}) => {

  const handleLogout = () => {
    const admin = new Admin()
    admin.logOut()
    .finally(() => {
      window.location.href = '/'
    })
  }

  return (
    <header className="admin-header">
      <div className="admin-header-container">
        <div className="admin-search-sort">
          {/* <SearchBox /> */}
          <span className="material-icons menu-icon" onClick={onOpenSideNav}>
            menu
          </span>
        </div>
        <div className="admin-action">
          <p className="admin-status"> 
          <span className="admin-status-label">
            Signed in as
          </span> 
          <span className="admin-email"> {email} </span> </p>
          <button className="log-out-button" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
    </header>
  )
}