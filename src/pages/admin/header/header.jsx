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

export const AdminHeader = ({email}) => {

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
          <SearchBox />
        </div>
        <div className="admin-action">
          <p className="admin-status"> Signed in as <span className="admin-email"> {email} </span> </p>
          <button className="log-out-button" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
    </header>
  )
}