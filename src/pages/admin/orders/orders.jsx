import React, { useEffect, useState } from 'react'
import { NavLink, BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom'
import './orders.scss'
import gasBottle from '../../../assets/icons/gas-bottle-dark.png'
import Order from '../../../helpers/orders'
const order = new Order()

function getOrder(orders, id) {
  console.log('Finding order ', id)
  return orders.find(el => el.orderId === id)
}

function getOrderDate(time) {
  const months = ['January', 'February', 'March', 'April',
                  'May', 'June', 'July', 'August', 'September',
                  'October', 'November', 'December' ]
  const date = new Date(time)
  const [ day, month, year ] = [
    date.getDate(),
    months[date.getMonth()],
    date.getFullYear()
  ]
  return `${day} ${month}, ${year}` 
}

function getTimeOfOrder (time) {
  const date = new Date(time)
  let [hours, minutes] = [date.getHours(), date.getMinutes()]
  let period = hours > 12 ? 'PM' : 'AM'
  hours = hours > 12 ? hours-12 : hours
  hours = hours < 10 ? '0'+hours : hours
  minutes = minutes < 10 ? '0'+minutes : minutes
  return `${hours}:${minutes} ${period}`
}

const NoOrderInView = () => {
  return (
  <div className="no-order">
    <span className="material-icons icon">
      shopping_basket
    </span>
    <h1>
      No Selected Order
    </h1>  
  </div>
  )
}

const OrderListItem = ({order, onClick}) => {
  return (
    <NavLink to={`/admin/orders/${order.orderId}`} className="order-item" activeClassName="active" onClick={() => onClick(order.orderId)}>
      <div className="order-id">
        <div className="order-icon">
          <img src={gasBottle} alt={`order_${order.orderId}`} />
        </div>
        <p>
          {order.name}
        </p>
      </div>
      <p className="order-capacity">
        {order.capacity}kg
      </p>
      <p className={`order-status ${order.status}`}>
        {order.status}
      </p>
      <p className="time">
        {getTimeOfOrder(order.timeCreated) + ', ' + getOrderDate(order.timeCreated)}
      </p>
    </NavLink>
  )
}

const OrderDetail = ({label, children}) => (
  <div className="order-property">
    <h5 className="property-name"> {label} </h5>
    <p className="property-value">
      {children}
    </p>
  </div>
)

const OrderView = ({order}) => {
  return (
    <section className="order-in-view">
      <div className="customer-card">
        <h3 class="customer-name">
          { order.name }
        </h3>
        <p className="customer-address">
          { order.address }
        </p>
        <p className="date-ordered">
          {getOrderDate(order.timeCreated)}
        </p>
      </div>

      <div className="order-details">
        <h2 className="order-details-title">
          Order Details
        </h2>
        <div className="order-details-content">
          <OrderDetail label="Customer Name">
            {order.name}
          </OrderDetail>
          <OrderDetail label="Phone Number">
            {order.phoneNumber}
          </OrderDetail>
          <OrderDetail label="No. of Kgs">
            {order.capacity}Kg
          </OrderDetail>
          <OrderDetail label="Order Status">
            {order.status}
          </OrderDetail>
          <OrderDetail label="Customer Address">
            {order.address}
          </OrderDetail>
          <OrderDetail label="Time Ordered">
            {getTimeOfOrder(order.timeCreated)}
          </OrderDetail>
          <OrderDetail label="Date Ordered">
            {getOrderDate(order.timeCreated)}
          </OrderDetail>
          <button className="update-order-status">
            Mark as completed
          </button>
        </div>
      </div>
    </section>
  )
}

export const AdminPanelOrders = () => {
  const [ orders, setOrders ] = useState([])
  const [ orderInView, setOrderInView ] = useState({})

  const handleSetOrder = (orderId) => {
    setOrderInView(getOrder(orders, orderId))
  }

  useEffect(() => {
    order.getOrders()
    .then((data) => {
      setOrders(data)
    }).catch(error => {
      console.log(error)
    })
  }, [])
  return (
    <Router>
      <section className="page-container">
        <div className="orders-list">
          <div className="order-min">
            {
              orders.map(order => 
                <OrderListItem 
                  key={order.orderId} 
                  order={order} 
                  onClick={handleSetOrder} 
                />)
            }
          </div>
        </div>
        <div className="orders-view">
            <Switch>
              <Route path="/admin/orders/:orderId">
                <OrderView order={orderInView} />
              </Route>
            </Switch>
          {
            !orderInView.orderId && <NoOrderInView />
          } 
        </div>
      </section>
    </Router>
  )
}