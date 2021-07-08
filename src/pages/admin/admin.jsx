import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Admin from '../../helpers/admin'
import './admin.scss'
import { AdminDashboard } from './dashboard/dashboard'
import { AdminHeader } from './header/header'
import { AdminNavigation } from './navigation/navigation'
import { AdminPanelOrders } from './orders/orders'

export const AdminPanel = () => {
  const admin = new Admin()
  const [currentAdmin, setCurrentAdmin] = useState({})
  
  useEffect(() => {
    admin.currentAdmin()
    .then((admin) => {
        if (!admin) {
        window.location.href = '/'
        return
      }
      setCurrentAdmin({
          email: admin.email,
        uid: admin.uid
      })
    })
  })
  
  return <AdminPanelBody currentAdmin={currentAdmin} />
}

const AdminPanelBody = ({ currentAdmin }) => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)
  return (
    <Router>
      <main id="admin">
        <div className={`side-navigation ${isSideNavOpen ? 'open' : ''}`}>
          <AdminNavigation onCloseSideNav={ () => setIsSideNavOpen(false) } />
        </div>
        <div className="admin-pages">
          <AdminHeader email={currentAdmin.email} onOpenSideNav={() => setIsSideNavOpen(true)}  />
          <Switch>
            <Route path="/admin/dashboard" exact component={AdminDashboard} />
            <Route path="/admin/orders" exact component={AdminPanelOrders} />
          </Switch>
        </div>
      </main>
    </Router>
  )
}