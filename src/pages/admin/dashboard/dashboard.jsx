/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Order from '../../../helpers/orders'
import { FormField } from '../../order/order'
import './dashboard.scss'
const orderInstance = new Order()

const DashboardCard = ({ title, value, buttonLabel, buttonAction, loading, theme }) => {
  return loading ? <DashboardCardSkeleton /> :
    (
      <div className="dashboard-card" style={{backgroundColor: theme || 'white'}}>
        <p className={`dashboard-card--title ${theme ? 'white-text' : ''}`}>
          { title }
        </p>
  
        <h2 className={`dashboard-card--value ${theme ? 'white-text' : ''} ${buttonLabel ? 'has-button' : ''}`}>
          { value }
        </h2>
  
        <button className="dashboard-card--action" onClick={buttonAction}>
          { buttonLabel }
        </button>
      </div>
    ) 
}

const DashboardCardSkeleton = () => {
  return (
    <div className="dashboard-card-skeleton">
      <div className="dashboard-card-skeleton--title">
        
      </div>

      <div className={`dashboard-card-skeleton--value`}>
      </div>

      <div className="dashboard-card-skeleton--action">
      </div>
    </div>
  )
}

const PriceForm = ({ onClose }) => {

  const [ priceObject, setPriceObject ] = useState({})
  const [ submitting, setSubmitting ] = useState(false)
  const [ submitError, setSubmitError ] = useState('')

  function handleFormInput (priceObject) {
    setPriceObject(priceObject)
  }

  function updatePricePerKG () {
    setSubmitting(true)
    orderInstance.setPrice(priceObject)
    .then((data) => {
      onClose(data)
    }).catch((e) => {
      setSubmitError(e.message || 'Failed to set price per kg. Please try again.')
    }).finally(() => {
      setSubmitting(false)
    })
  }

  return (
    <section className="form-overlay">
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form--header">
          <h3 className="form--header__title">
            Set new Price
          </h3>
          <span className="material-icons form--header__icon" onClick={onClose}> close </span>
        </div>

        <FormField 
          label="Price per KG"
          name="price"
          placeholder="e.g - 350"
          pattern={/^[+]?\d+([.]\d+)?$/}
          errorMessage="Please enter a valid number"
          type="number"
          onInput={handleFormInput}
        />

        <button className={`form--action ${submitting ? 'submitting' : ''}`} onClick={updatePricePerKG} disabled={submitting}>
          SET NEW PRICE
        </button>

        {/* Use submit error here */}
      </form>
    </section>
  )
}

export const AdminDashboard = () => {
  const [pricePerKG, setPricePerKG] = useState(0)
  const [openPriceForm, setOpenPriceForm] = useState(false)
  const [fetchPriceError, setFetchPriceError] = useState(false)
  const [fetchingPrice, setFetchingPrice] = useState(false)
  const [orders, setOrders] = useState([])
  const [fetchingOrders, setFetchingOrders] = useState(true)
  const [fetchingOrdersError, setFetchingOrdersError] = useState('')
  
  useEffect(() => {
    fetchPricePerKg()
    fetchOrders()
  }, [])
  
  function togglePriceForm (value, newPrice) {
    if (newPrice && newPrice.price) setPricePerKG(newPrice.price)
    setOpenPriceForm(value)
  }
  
  function fetchPricePerKg() {
    setFetchPriceError(false)
    setFetchingPrice(true)
    orderInstance.getPrice()
    .then((data) => {
      setPricePerKG(data.price)
    }).catch(() => {
      setFetchPriceError(true)
    }).finally(() => {
      setFetchingPrice(false)
    })
  }

  function fetchOrders() {
    setFetchingOrders(true)
    setFetchingOrdersError(false)
    orderInstance.getOrders()
    .then((data) => {
      setOrders(data)
    }).catch(() => {
      setFetchingOrdersError(true)
    }).finally(() => {
      setFetchingOrders(false)
    })
  }

  return (
    <section className="dashboard">
      <div className="dashboard-cards">
        <DashboardCard 
          title="Price per kg"
          value={`NGN ${pricePerKG?.toLocaleString()}`}
          buttonLabel="Change"
          buttonAction={ () => togglePriceForm(true)}
          loading={fetchingPrice}
          shouldRetry={fetchPriceError}
          retryAction={fetchPricePerKg}
        />
        
        <DashboardCard 
          title="All orders"
          value={orders.length}
          theme="#2685aa"
          loading={fetchingOrders}
        />

        <DashboardCard 
          title="Pending Orders"
          value={orders.filter(el => el.status === 'pending').length}
          theme="#ff7715"
          loading={fetchingOrders}
        />

        <DashboardCard 
          title="Completed Orders"
          value={orders.filter(el => el.status === 'completed').length}
          theme="#05d086"
          loading={fetchingOrders}
        />
      </div>
      { openPriceForm && <PriceForm onClose={(e) => togglePriceForm(false, e)} /> }
    </section>
  )
}