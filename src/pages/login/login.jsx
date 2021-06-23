import React, { useEffect, useState } from 'react'
import './login.scss'
import { FormField } from '../order/order'
import Admin from '../../helpers/admin'
import { useHistory } from 'react-router-dom'

export const AdminLogin = () => {
  const admin = new Admin()
  const history = useHistory()
  const [formData, setFormData] = useState({})
  const [ submitting, setSubmitting ] = useState(false)
  const [ submitError, setSubmitError ] = useState(null)

  useEffect(() => {
    admin.currentAdmin()
    .then((adminUser) => {
      if (adminUser) {
        history.push('/admin/dashboard')
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
      history.push('/admin/dashboard')
    }).catch(error => {
      setSubmitError(error.message)
    }).finally(() => {
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
        { submitError && (<div className="error-box">
         { submitError || 'We could not log you in. Please check your inputs and try again'}
        </div>)}
      </section>
    </main>
  )
}