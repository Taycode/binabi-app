import React from 'react'
import './app-modal.scss'

export const AppModal = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-container--title-bar">
          <h5 className="modal-container--title-bar__message">
            Message
          </h5>
          <div className="modal-container--title-bar__icon" onClick={onClose}>
            <i className="material-icons">
              close
            </i>
          </div>
        </div>

        <div className="modal-container--content-body">
          <p className="modal-container--content-body__message">
            {message}
          </p>
        </div>

        <div className="modal-container--actions-body">
          <button className="modal-container--actions-body__button" onClick={onClose}>
            CLOSE
          </button>
        </div>
      </div>
    </div>
  )
}