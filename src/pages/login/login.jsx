import React, { useEffect, useState } from 'react'
import './login.scss'
import { FormField } from '../order/order'
import Admin from '../../helpers/admin'
import { AppModal } from '../../components/app/modal/AppModal'

export const AdminLogin = () => {
  const admin = new Admin()
  const [formData, setFormData] = useState({})
  const [ submitting, setSubmitting ] = useState(false)
  const [ submitError, setSubmitError ] = useState(null)

  useEffect(() => {
    admin.currentAdmin()
    .then((adminUser) => {
      if (adminUser) {
        window.location.href = '/admin/dashboard'
      }
    })
  })
  
  const handleInput = (data) => {
    setFormData({...formData, ...data})
  }
  
  const handleSubmit = () => {
    let values = Object.values(formData)
    if (values.length < 2 || values.includes(null)) return
    setSubmitting(true)
    setSubmitError(false)
    admin.authenticate(formData)
    .then(data => {
      window.location.href = '/admin/dashboard'
    }).catch(error => {
      setSubmitError(JSON.parse(error.message).error.message)
      setSubmitting(false)
    })
  }

  return (
    <main>
      <section className="form">
        <div className="form-header">
          <h3 className="form-header-title"> Admin Login </h3>
        </div>
        <FormField 
          label="Email Address"
          placeholder="user@website.com"
          name="email"
          pattern={/[a-zA-Z]/}
          errorMessage="Please enter a valid email"
          type="email"
          onInput={handleInput}
        />
        <FormField 
          label="Password"
          placeholder="password"
          name="password"
          pattern={/[a-zA-Z]/}
          errorMessage="Please input your admin password"
          type="password"
          onInput={handleInput}
        />
        <button className={`submit-button ${submitting && 'submitting'}`} onClick={handleSubmit}>
          Log in
        </button>
        { submitError && <AppModal message={ submitError || 'We could not log you in. Please check your inputs and try again'} onClose={() => setSubmitError(false)} /> }
      </section>
    </main>
  )
}