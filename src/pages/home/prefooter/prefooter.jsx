import React from 'react'
import { NavLink } from 'react-router-dom'
import './prefooter.scss'

export const PreFooter = () => (
  <div className="pre-footer">
    <div className="container">
      <div className="column">
        <h3 className="title">
          The Best Gas you can find around you 
        </h3>
        <p className="caption">
          Binabi provides quality gas that meets your need. It is great for cooking and any other activity you plan to use gas for. 
        </p>
        <div className="actions">
          <NavLink to="/order" style={{display: 'table', margin: 'auto'}}>
            <button className="call-to-action">
              Place an order
            </button>
          </NavLink>
          <NavLink to="/services" style={{display: 'table', margin: 'auto'}}>
            <button className="call-to-action-service">
              Our services
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  </div>
)
