import React from 'react'
import { Hero } from './hero/hero'
import { PreFooter } from './prefooter/prefooter'
import { ServiceSection } from './services/services'
import { TestimonialsSection } from './testimonials/testimonials'

export const Home = () => (
  <div>
    <Hero />
    <ServiceSection />
    <TestimonialsSection />
    <PreFooter />
  </div>
)