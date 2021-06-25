// Create me context and router here
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, useHistory, useRouteMatch } from 'react-router-dom'
import Admin from '../../helpers/admin'
import './admin.scss'
import { AdminDashboard } from './dashboard/dashboard'
import { AdminNavigation } from './navigation/navigation'

export const AdminPanel = () => {
  const admin = new Admin()
  const History = useHistory()
  const match = useRouteMatch()

  console.log(match)
  useEffect(() => {
    admin.currentAdmin()
    .then((admin) => {
      if (!admin) {
        History.push('/')
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
            <Route path={`${match.url}/dashboard`} exact component={AdminDashboard} />
          </Switch>
        </div>
      </main>
    </Router>
  )
}