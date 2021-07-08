import React, { useEffect, useState } from 'react'
import { NavLink, BrowserRouter as Router, Switch, Route } from 'react-router-dom'
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
    'October', 'November', 'December']
  const date = new Date(time)
  const [day, month, year] = [
    date.getDate(),
    months[date.getMonth()],
    date.getFullYear()
  ]
  return `${day} ${month}, ${year}`
}

function getTimeOfOrder(time) {
  const date = new Date(time)
  let [hours, minutes] = [date.getHours(), date.getMinutes()]
  let period = hours > 12 ? 'PM' : 'AM'
  hours = hours > 12 ? hours - 12 : hours
  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes
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

const OrderListItem = ({ order, onClick }) => {
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

const OrderDetail = ({ label, children }) => (
  <div className="order-property">
    <h5 className="property-name"> {label} </h5>
    <p className={`property-value ${label === 'Order Status' && children}`}>
      {children}
    </p>
  </div>
)

const OrderView = ({ order: currentOrder }) => {
  const [ updating, setUpdating ] = useState(false)
  const [updateError, setUpdateError] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)

  const handleUpdateOrder = (field) => {
    setUpdating(true)
    setUpdateError(false)
    setUpdateSuccess(false)
    order.updateOrder(currentOrder.orderId, field )
    .then(() => {
        setUpdateSuccess(true)
      }).catch((error) => {
        setUpdateError(error.message)
      }).finally(() => {
        setUpdating(false)
      })
  }

  useEffect(() => {
    setUpdateError(false)
    setUpdateSuccess(false)
  }, [currentOrder])

  return (
    <section className="order-in-view">
      <div className="customer-card">
        <h3 class="customer-name">
          {currentOrder.name}
        </h3>
        <p className="customer-address">
          {currentOrder.address}
        </p>
        <p className="date-ordered">
          {getOrderDate(currentOrder.timeCreated)}
        </p>
      </div>

      <div className="order-details">
        <h2 className="order-details-title">
          Order Details
        </h2>

        <div className="order-details-content">
          <OrderDetail label="Customer Name">
            {currentOrder.name}
          </OrderDetail>

          <OrderDetail label="Phone Number">
            {currentOrder.phoneNumber}
          </OrderDetail>

          <OrderDetail label="No. of Kgs">
            {currentOrder.capacity}Kg
          </OrderDetail>

          <OrderDetail label="Order Status">
            {currentOrder.status}
          </OrderDetail>

          <OrderDetail label="Customer Address">
            {currentOrder.address}
          </OrderDetail>

          <OrderDetail label="Time Ordered">
            {getTimeOfOrder(currentOrder.timeCreated)}
          </OrderDetail>

          <OrderDetail label="Date Ordered">
            {getOrderDate(currentOrder.timeCreated)}
          </OrderDetail>

          <button className={`update-order-status ${currentOrder.status} ${updating && 'updating'}`} onClick={ () => handleUpdateOrder({status: 'completed'})}>
            Mark as completed
          </button>

          {
            updateError && (
              <div className="error-box">
                {updateError || 'An error occurred while updating orderStatus'}
              </div>
            )
          }
          {
            updateSuccess && (
              <div className="success-box">
                Order Status updated successfully!
              </div>
            )
          }
        </div>
      </div>
    </section>
  )
}

const Loader = () => {
  return (
    <div className="loading-component">
      <div className="spinner">

      </div>
      <p className="label">
        please wait
      </p>
    </div>
  )
}

const AdminPanelOrdersHeader = ({ onSelectSortMethod }) => {
  return (
    <div>
      <p> Sort </p>
      <select onChange={(e) => onSelectSortMethod(e.target.value)}>
        <option value="0"> Default </option>
        <option value="1"> Time (z-a) </option>
        <option value="2"> Time (a-z) </option>
        <option value="3"> Name (a-z) </option>
        <option value="4"> Name (z-a) </option>
        <option value="5"> No. of Kg (z-a) </option>
        <option value="6"> No. of Kg (a-z) </option>
        <option value="7"> Status (a-z) </option>
        <option value="8"> Status (z-a) </option>
      </select>
    </div>
  )
}

export const AdminPanelOrders = () => {
  const [orders, setOrders] = useState([])
  const [immutableOrders, setImmutableOrders] = useState([])
  const [orderInView, setOrderInView] = useState({})
  const [isFetchingOrders, setIsFetchingOrders] = useState(true)

  const handleSetOrder = (orderId) => {
    setOrderInView(getOrder(orders, orderId))
  }

  useEffect(() => {
    order.getOrders()
      .then((data) => {
        setOrders(data)
        setImmutableOrders(data)
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        setIsFetchingOrders(false)
      })
  }, [])

  function handleSort (method) {
    let mutableOrderInstance = immutableOrders.slice()
    if (method === '1') {
      mutableOrderInstance = mutableOrderInstance.sort((a, b) => a.timeCreated > b.timeCreated ? -1 : 1)
    } else if (method === '2') {
      mutableOrderInstance = mutableOrderInstance.sort((a, b) => a.timeCreated < b.timeCreated ? -1 : 1)
    }
    setOrders(mutableOrderInstance)
  }

  return (
    <Router>
      <section className="page-container">
        <AdminPanelOrdersHeader onSelectSortMethod={handleSort} />
        <div className="orders-list">
          {
            isFetchingOrders && <Loader />
          }
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