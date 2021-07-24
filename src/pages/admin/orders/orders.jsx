import React, { useEffect, useState } from 'react'
import { NavLink, BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom'
import './orders.scss'
import gasBottle from '../../../assets/icons/gas-bottle-dark.png'
import Order from '../../../helpers/orders'
import { AppModal } from '../../../components/app/modal/AppModal'
const order = new Order()

function getOrder(orders, id) {
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

const NoOrdersFound = () => {
  return (
    <div className="no-orders">
      <div className="no-orders--container">
        <i className="material-icons">
          shopping_basket
        </i>
        <h1 className="no-orders--container__title">
          Your customers are yet to place any orders. Check back soon!
        </h1>
      </div>
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

const UpdateOrderStatusButton = ({currentOrder, children, status, setOrderStatus }) => {
  const [ updating, setUpdating ] = useState(false)
  const [ updateError, setUpdateError] = useState(false)
  const [ updateSuccess, setUpdateSuccess] = useState(false)

  const handleCloseAlertBox = () => {
    setUpdateError(false)
    setUpdateSuccess(false)
  }

  const handleUpdateOrder = () => {
    setUpdating(true)
    setUpdateError(false)
    setUpdateSuccess(false)
    order.updateOrder(currentOrder.orderId, { status } )
    .then(() => {
        setUpdateSuccess(true)
        setOrderStatus({ ...currentOrder, status })
      }).catch((error) => {
        setUpdateError(error.message)
      }).finally(() => {
        setUpdating(false)
      })
  }
  return (
    <>
      <button className={`update-order-status ${status} ${updating && 'updating'}`} onClick={ () => handleUpdateOrder({status})}>
        { children }
      </button>

      { (updateError || updateSuccess) && <AppModal 
          message={updateError ? updateError || 'An error occurred while updating orderStatus' : 'Order Status updated successfully!' }
          onClose={handleCloseAlertBox}
        /> 
      }
    </>
  )
}

const OrderView = ({ order: currentOrder, isActive, backAction, onUpdateOrder }) => {
  return (
    <section className="order-in-view">
      <div className="exit-action-container" onClick={backAction}>
        <div className="exit-action-container--icon">
          <span className="material-icons">
            arrow_back
          </span>
        </div>
        <p className="exit-action-container--action-name">
          Back
        </p>
      </div>
      <div className="customer-card">
        <h3 className="customer-name">
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

        </div>
        <div className="order-details-actions">
          { currentOrder.status !== 'completed' && <UpdateOrderStatusButton currentOrder={currentOrder} status="completed" setOrderStatus={onUpdateOrder}> Mark as completed </UpdateOrderStatusButton> }
          { currentOrder.status !== 'cancelled' && <UpdateOrderStatusButton currentOrder={currentOrder} status="cancelled" setOrderStatus={onUpdateOrder} > Mark as cancelled </UpdateOrderStatusButton> }
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
    <div className="order-header">
      <div className="sorting-field">
        <p className="sorting-field--label"> Sort orders by:  </p>
        <select className="sorting-field--select-box" onChange={(e) => onSelectSortMethod(e.target.value)}>
          <option value={JSON.stringify({field: 'timeCreated', order: 'desc'})}> Default </option>
          <option value={JSON.stringify({field: 'timeCreated', order: 'desc'})}> Time (z-a) </option>
          <option value={JSON.stringify({field: 'timeCreated', order: 'asc'})}> Time (a-z) </option>
          <option value={JSON.stringify({field: 'name', order: 'asc'})}> Name (a-z) </option>
          <option value={JSON.stringify({field: 'name', order: 'desc'})}> Name (z-a) </option>
          <option value={JSON.stringify({field: 'capacity', order: 'desc'})}> No. of Kg (z-a) </option>
          <option value={JSON.stringify({field: 'capacity', order: 'asc'})}> No. of Kg (a-z) </option>
          <option value={JSON.stringify({field: 'status', order: 'asc'})}> Status (a-z) </option>
          <option value={JSON.stringify({field: 'status', order: 'desc'})}> Status (z-a) </option>
        </select>
      </div>
    </div>
  )
}

const FetchMoreOrdersButton = ({ onFetchOrders }) => {
  return <button className="orders-load-button" onClick={onFetchOrders}>
    Load More
  </button>
}

export const AdminPanelOrders = () => {
  const [orders, setOrders] = useState([])
  const [orderInView, setOrderInView] = useState({})
  const [sortOptions, setSortOptions] = useState({
    field: 'timeCreated', order: 'desc'
  })
  const [isFetchingOrders, setIsFetchingOrders] = useState(true)
  const [ error, setError] = useState(null)
  const [ fetchedFirstBatch, setFetchedFirstBatch ] = useState(false)
  const [ noOrdersFound, setNoOrdersFound ] = useState(false)

  const handleSetOrder = (orderId) => {
    setOrderInView(getOrder(orders, orderId))
  }

  useEffect(() => {
    setIsFetchingOrders(true)
    setOrders([])
    setNoOrdersFound(false)
    setFetchedFirstBatch(false)
    order.getOrders(sortOptions.field, sortOptions.order)
    .then((data) => {
      if (data.length < 1) {
        setNoOrdersFound(true)
      } else {
        setOrders(data)
        setFetchedFirstBatch(true)
      }
      }).catch(error => {
        setError('Cannot fetch orders at this time. Please try again.')
      }).finally(() => {
        setIsFetchingOrders(false)
      })
    }, [sortOptions])
    
    function handleSort (method) {
      setSortOptions(JSON.parse(method))
    }
  
    function handleLoadMore () {
      setIsFetchingOrders(true)
      order.getOrders(sortOptions.field, sortOptions.order, orders.length > 0 && orders[orders.length - 1][sortOptions.field])
    .then((data) => {
      if (data.length < 1) {
        setError('No more orders to fetch!')
      } else {
        setOrders(orders.concat(data))
      }
    }).catch( error => {
      setError('Cannot fetch orders at this time. Please try again.')
    }).finally(() => {
      setIsFetchingOrders(false)
    })
  }

  function handleCloseError () {
    setError(null)
  }

  const history = useHistory()  
  function backActionForOrderInView () {
    setOrderInView({})
    history.push('/admin/orders')
  }

  function popInUpdatedOrder (updatedOrder) {
    let mutableOrders = orders.slice()
    mutableOrders.map((el) => {
      if (el.orderId === updatedOrder.orderId) {
        el.status = updatedOrder.status
      }
      return el
    })
    setOrders(mutableOrders)
  }

  return (
    <Router>
      { error && <AppModal message={error} onClose={handleCloseError} /> }
      <AdminPanelOrdersHeader onSelectSortMethod={handleSort} />
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
          { isFetchingOrders && <Loader /> }
          { fetchedFirstBatch && <FetchMoreOrdersButton onFetchOrders={handleLoadMore} /> }
          { noOrdersFound && <NoOrdersFound /> }
        </div>
        <div className={`orders-view ${orderInView.orderId ? 'in-view' : ''}`}>
          <Switch>
            <Route path="/admin/orders/:orderId">
              { orderInView.orderId && <OrderView order={orderInView} isActive backAction={backActionForOrderInView} onUpdateOrder={(uOrder) => popInUpdatedOrder(uOrder)} /> }
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
