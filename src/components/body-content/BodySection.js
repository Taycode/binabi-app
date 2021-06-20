import React from "react";
import "./BodySection.css";
import serviceImg from "./../images/2.jpeg";
import heroImage from "./../images/1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPercentage,
  faUser,
  faWrench,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

function BodySection() {
  return (
    <div className="body-section">
      <div className="hero-section">
        <img src={heroImage} alt="hero" className="hero-img" />
        <h1>Quality Gas to Meet your Needs.</h1>
      </div>

      <div className="others-section">
        <h2 className="body-h2">We Render Services:</h2>
        <div className="first-section">
          <div className="skill">
            <FontAwesomeIcon icon={faPercentage} className="icon" />
            <div className="content">
              <h3>100% Quality Gas</h3>
              <p>Gas with the best quality that can ever be found.</p>
            </div>
          </div>
          <div className="skill">
            <FontAwesomeIcon icon={faChartLine} className="icon" />
            <div className="content">
              <h3>High Level of productivity</h3>
              <p>Gas with the best quality that can ever be found.</p>
            </div>
          </div>
          <div className="skill">
            <FontAwesomeIcon icon={faUser} className="icon" />
            <div className="content">
              <h3>World class customer service</h3>
              <p>
                Amazing customer service that leaves a wonderful smile on your
                face.
              </p>
            </div>
          </div>
          <div className="skill">
            <FontAwesomeIcon icon={faWrench} className="icon" />
            <div className="content">
              <h3>Risk Free Products</h3>
              <p>Petroleum products with zero risk.</p>
            </div>
          </div>
        </div>

        <div className="second-section">
          <div className="first-content">
            <h1>The Best Gas you can find around you</h1>
            <p>
              We sell the best of gas cylinders that meets the expectation of
              prospective customers. We ensure to render the best of services.
            </p>
          </div>

          <img src={serviceImg} alt="service" />
        </div>

        <div className="third-section">
          <h2>TESTIMONIALS</h2>
          <p>
            Lorem ipsum dolor sit amet, officia excepteur ex fugiat
            reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit
            ex esse exercitation amet. Nisi animcupidatat excepteur officia.
            Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate
            voluptate dolor minim nulla est proident. Nostrud officia pariatur
            ut officia. Sit irure elit esse ea nulla sunt ex occaecat
            reprehenderit commodo officia dolor Lorem duis laboris cupidatat
            officia voluptate. Culpa proident adipisicing id nulla nisi laboris
            ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo
            ex non excepteur duis sunt velit enim. Voluptate laboris sint
            cupidatat ullamco ut ea consectetur et est culpa et culpa duis.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BodySection;
