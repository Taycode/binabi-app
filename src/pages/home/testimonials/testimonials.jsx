import React from "react"
import './testimonials.scss'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import man from '../../../assets/icons/man.png'

const testimonies = [
  'a', 'b', 'c', 'd', 'e'
]

export const TestimonialsSection = () => (
  <section className="testimonials-section">
    <h1 className="sectionTitle">
      What our clients say
    </h1>
    <div className="container">
      <Carousel autoplay={true} showThumbs={false}>
        {
          testimonies.map((el, i) => (
            <div key={'el'+i}>
              <div className="message-box">
                <p className="message">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus eveniet minus quo doloremque sapiente esse sed incidunt quidem architecto totam vero libero enim tempore, fugiat repellat fugit? Ratione, saepe dolore sapiente esse sed incidunt quidem architecto totam vero libero enim tempore, fugiat repellat fugit? Ratione, saepe dolore?
                </p>
                <div className="writer-details">
                  <img src={man} alt="binabi_customer_john_doe" className="writer-avatar" />
                  <h6 className="message-from">
                    John Doe
                  </h6>
                </div>
              </div>
            </div>
          )) 
        }
      </Carousel>
    </div>
  </section>
)