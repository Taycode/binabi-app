import React from "react";
import { Hero } from "../home/hero/hero";
import { PreFooter } from "../home/prefooter/prefooter";
import { ServiceSection } from "../home/services/services";
import { TestimonialsSection } from '../home/testimonials/testimonials'

function BodySection() {
  return (
    <div>
      <Hero />
      <ServiceSection />
      <TestimonialsSection />
      <PreFooter />
    </div>
  );
}

export default BodySection;
