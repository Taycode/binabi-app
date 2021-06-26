import React from 'react'
import './services.scss'
import gas from '../../assets/icons/gas-white.png'
import gasBottle from '../../assets/icons/gas-bottle-white.png'
import { Link } from 'react-router-dom'
let arr = ['a', 'b', 'c', 'd', 'e']


export const OurServices = () => (
  <main>
    <div className="service-header">
      <div className="header-grid">
        <h1 className="name">
          Our Services
        </h1>
        <div className="boxes">
          { arr.map(el => <hr key={el} className="border" /> ) }
        </div>
      </div>
    </div>
    <div className="container">
      <section className="service-section">
        <div className="column-one">
          <div className="column-header">
            <div className="icon">
              <img src={gas} alt="" />
            </div>
            <h3 className="service-name">
              Filling of Gas
            </h3>
          </div>
          <div className="column-body">
            <p className="service-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti cupiditate libero dolorum sed dolores voluptas eveniet repudiandae reprehenderit optio officia quisquam numquam dignissimos sunt, magni ex! Aliquid dolorum repudiandae soluta!
            </p>
            <Link to="/order">
              <button className="service-action">
                Place an Order
              </button>
            </Link>
          </div>
        </div>
        <div className="column-two" />
      </section>

      <section className="service-section">
        <div className="column-two right" />
        <div className="column-one">
          <div className="column-header">
            <div className="icon">
              <img src={gasBottle} alt="" />
            </div>
            <h3 className="service-name">
              Selling of Gas Cylinders
            </h3>
          </div>
          <div className="column-body">
            <p className="service-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti cupiditate libero dolorum sed dolores voluptas eveniet repudiandae reprehenderit optio officia quisquam numquam dignissimos sunt, magni ex! Aliquid dolorum repudiandae soluta!
            </p>
            <Link to="/order">
              <button className="service-action">
                Place an Order
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  </main>
)
