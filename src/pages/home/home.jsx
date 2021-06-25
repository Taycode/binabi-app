import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import { ContactUs } from '../contact-us/Contact'
import { AdminLogin } from '../login/login'
import { PlaceAnOrder } from '../order/order'
import { OurServices } from '../services/services'
import { Hero } from './hero/hero'
import { PreFooter } from './prefooter/prefooter'
import { ServiceSection } from './services/services'
import { TestimonialsSection } from './testimonials/testimonials'

export const Home = () => {
  return (
    <Router>
      <Header />
      <div className="content-holder">
        <Switch>
          <Route path={'/services'} exact component={OurServices} />
          <Route path={'/contact-us'} exact component={ContactUs} />
          <Route path={'/order'} exact component={PlaceAnOrder} />
          <Route path={'/login'} exact component={AdminLogin} />
          <Route path={'/'} exact>
            <div>
              <Hero />
              <ServiceSection />
              <TestimonialsSection />
              <PreFooter />
            </div>
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  )
} 