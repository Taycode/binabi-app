import React from "react"
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps'
import "./ContactSection.scss"
import logo from '../../assets/images/logo.png'

const socialMedia = [
  {
    id: 0,
    name: 'facebook',
    icon: 'https://img.icons8.com/fluent/144/000000/facebook-new.png',
    url: 'https://facebook.com/'
  },
  {
    id: 1,
    name: 'twitter',
    icon: 'https://img.icons8.com/fluent/144/000000/twitter.png',
    url: 'https://twitter.com/'
  },
  {
    id: 2,
    name: 'whatsapp',
    icon: 'https://img.icons8.com/fluent/144/000000/whatsapp.png',
    url: 'https://wa.me'
  },
  {
    id: 3,
    name: 'instagram',
    icon: 'https://img.icons8.com/fluent/144/000000/instagram-new.png',
    url: 'https://instagram.com'
  }
]

const GoogleMapView = withScriptjs(withGoogleMap((props) => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{lat: -34.397, lng: 150.644}}
  >
    { props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} /> }
  </GoogleMap>
)))

export const ContactUs = () => (
  <main>
    <GoogleMapView 
      isMarkerShown
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
      loadingElement={<div style={{ height: `60vh` }} />}
      containerElement={<div style={{ height: `60vh` }} />}
      mapElement={<div style={{ height: `60vh` }} />}
    />

    <section className="address-section">
      <div className="container">
        <h2 className="section-title">
          Contact address
        </h2>
        <div className="section-content">
          <div>
            <div className="company-brand">
              <img className="logo" src={logo} alt="binabi_logo" />
            </div>
            
            <div className="physical-address">
              No. 14, Opposite Ajanlekoko house,
              <br />
              Iberekodo, Abeokuta,
              <br />
              Ogun state.
            </div>
            
            <div className="direct-contact">
              <p className="email-contact">
                Email: support@.binabiglobal.com
              </p>
              <p className="phone-contact">
                Phone: +234-703-2345-342
              </p>
            </div>
          </div>
          <div className="social-media-section">
            <h6 className="social-header"> Social Media </h6>
            <div>
              {
                socialMedia.map(el => (
                  <a className="social-icon" rel="noopener noreferrer" href={el.url} title={el.name}>
                    <img src={el.icon} alt={`binabi_on_${el.name}`} />
                  </a>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
)