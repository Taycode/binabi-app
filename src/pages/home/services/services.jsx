import React from 'react'
import './services.scss'
import gasIcon from '../../../assets/icons/gas.png'
import graphIcon from '../../../assets/icons/graph.png'
import customerSupportIcon from '../../../assets/icons/customer-support.png'
import productIcon from '../../../assets/icons/product.png'

const serviceItems = [
  {
    id: 'item_1',
    title: '100% Quality Gas',
    caption: 'Gas with the best quality that can ever be found.',
    icon: gasIcon
  },
  {
    id: 'item_2',
    title: 'High Level of Productivity',
    caption: 'Gas with the best quality that can ever be found.',
    icon: graphIcon
  },
  {
    id: 'item_3',
    title: 'World class customer service',
    caption: 'Amazing customer service that leaves a wonderful smile on your face.',
    icon: customerSupportIcon
  },
  {
    id: 'item_4',
    title: 'Risk free products',
    caption: 'Petroleum products with zero risk',
    icon: productIcon
  } 
]

export const ServiceSection = () => (
  <section className="service-home-section">
    <div className="container">
      <h1 className="section-title">
        What we have to offer
      </h1>
      <div className="service-grid">
        {
          serviceItems.map(el => (
            <div className="service-card" key={el.id}>
              <div className="service-icon">
                <img src={el.icon} alt={`banabi_${el.title}`} />
              </div>
              <div className="content">
                <h3 className="service-title"> {el.title} </h3>
                <p className="service-description"> {el.caption} </p>
              </div>
            </div>
          ))
        }
    </div>
    </div>
  </section>
)