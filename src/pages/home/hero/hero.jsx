import React from 'react'
import { NavLink } from 'react-router-dom'
import './hero.css'

export const Hero = () => (
  <div className="hero">
    <div>
      <h1 className="hero-copy">
        Quality Gas to Meet Your Needs.
      </h1>
      <NavLink to="/order" style={{display: 'table', margin: 'auto'}}>
        <button className="call-to-action">
          Place an order
        </button>
      </NavLink>
    </div>
  </div>
)