import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Admin from '../../helpers/admin'
import './admin.scss'
import { AdminDashboard } from './dashboard/dashboard'
import { AdminNavigation } from './navigation/navigation'

export const AdminPanel = () => {
  const admin = new Admin()

  useEffect(() => {
    admin.currentAdmin()
    .then((admin) => {
      if (!admin) {
        window.location.href = '/'
      }
    })
  })

  return (
    <Router>
      <main id="admin">
        <div className="side-navigation">
          <AdminNavigation />
        </div>
        <div className="admin-pages">
          {/* Header */}
          <Switch>
            <Route path="/admin/dashboard" exact component={AdminDashboard} />
          </Switch>
        </div>
      </main>
    </Router>
  )
}