import React from "react";
import "./Service.css";
import refill from "./../../images/Refill.jpg"
import fill from "./../../images/fill.jpg"

function ServiceSection() {
  return (
    <div className="service-section">
      <h1>SERVICE</h1>

      <div className="services">
        <div className="refill-content">
        <h4>Sell the Best of Gas Cylinders</h4>
        <p>We sell varieties of Gas cylinder with different colors and size. We also sell other gas materials.</p>
        </div>
        
        <img src={refill} alt="refill"/>
      </div>


      <div className="services">
      <img src={fill} alt="refill"/>

        <div className="refill-content">
        <h4>Sell the Best of Gas Cylinders</h4>
        <p>We sell varieties of Gas cylinder with different colors and size. We also sell other gas materials.</p>
        </div>
              </div>
    </div>
  );
}

export default ServiceSection;
