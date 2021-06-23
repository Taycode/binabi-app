import React, { useState } from 'react'
import Order from '../../helpers/orders'
import './order.scss'

const orderInstance = new Order()

export const PlaceAnOrder = () => (
  <main className="body">
    <div className="container">
      <LeftOrderColumn />
      <RightOrderColumn />
    </div>
  </main>
)

const LeftOrderColumn = () => (
  <div className="image-container">
    <h1 className="title">
      Place your <br /> Order
    </h1>
    <p className="content">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi a praesentium assumenda cupiditate corrupti nisi. A iste odio praesentium, odit, rem et voluptas assumenda est, ducimus pariatur nisi quis illo!
    </p>
  </div>
)

const RightOrderColumn = () => {

  const [ formData, setFormData ] = useState({})
  const [ submitting, setSubmitting ] = useState(false)
  const [ submitError, setSubmitError ] = useState(null)
  const [ success, setSuccess ] = useState(false)

  function handleInput (data) {
    setFormData({...formData, ...data})
  }

  function handleSubmit () {
    let values = Object.values(formData)
    if (values.length < 4 || values.includes(null)) return

    setSubmitting(true)
    setSubmitError(false)
    setSuccess(false)
    orderInstance.createOrder(formData).then(() => {
      setSuccess(true)
    }).catch((e) => {
      console.log(e)
      setSubmitError(true)
    }).finally(() => {
      setSubmitting(false)
    })
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h1 className="form-title">
          Fill the form below
        </h1>
        <p className="title-caption">
          to place your order
        </p>
      </div>
      
      <FormField
        label="Fullname"
        name="name" //The name becomes the object key - Very important
        placeholder="Firstname Lastname"
        pattern={/^([\w-]{3,})+\s+([\w\s]{3,})+$/} // For validation
        errorMessage="Please input your name in full"
        onInput={handleInput}
      />

      <FormField 
        label="Phone Number"
        name="phoneNumber"
        placeholder="08123456789"
        pattern={/((\+234)[0-9]{10,11})$|((070|080|081|090)[0-9]{8})$/}
        errorMessage="Please enter a valid phone number"
        onInput={handleInput}
      />

      <FormField 
        label="Address"
        name="address"
        placeholder="No. 00, Street, Town, City, State, "
        pattern={/[a-zA-Z]/}
        errorMessage="Please enter your address"
        onInput={handleInput}
      />

      <FormField 
        label="Number of Kgs"
        name="capacity"
        placeholder="1"
        type="number"
        pattern={/[0-9]/}
        errorMessage="Please enter a valid number"
        onInput={handleInput}
      />

      <button className={`submit-button ${submitting && 'submitting'}`} onClick={handleSubmit} disabled={submitting}>
        Place your order
      </button>
      
      { submitError && (<div className="error-box">
        Error occurred while placing your order. Please try again. 
      </div>)}

      {
        success && (
          <div className="success-box">
            Thank you! Your order has been received successfully.
          </div>
        )
      }
    </div>
  )
} 

const FormField = ({ label, name, placeholder, pattern, errorMessage, type, onInput }) => {
  const id = `f_${(Math.random() * 10000).toFixed(0)}`
  const [ error, setError ] = useState(null)
  const [ fieldValue, setFieldValue ] = useState('')

  function validateBeforeEmit (e) {
    let userEnteredInput = e.target.value
    setFieldValue(userEnteredInput)
    const RegexPattern = new RegExp(pattern)
    const userValueToEmit = RegexPattern.test(userEnteredInput) ? userEnteredInput : null
    setError(!userValueToEmit)
    return onInput({[name]: userValueToEmit})
  }

  return (
    <div className="field">
      <label 
        htmlFor={id} 
        className="label"
      > 
        {label} 
      </label>

      <input
        id={id} 
        name={name}
        type={type || 'text'}
        placeholder={placeholder}
        className="text-box"
        value={fieldValue}
        onInput={validateBeforeEmit}
      />
      <p className="error">
        { error && errorMessage }
      </p>
    </div>
  )
}
