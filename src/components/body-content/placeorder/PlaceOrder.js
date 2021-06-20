import React from "react";
import "./PlaceOrder.css";
import placeOrder from "../../../assets/images/order.png";

function PlaceOrder() {
  return (
    <div className="placeorder-section">
      <h1>Welcome. Place your order.</h1>

      <div className="order-section">
        <div className="img-sec">
          <img src={placeOrder} alt="order" />
        </div>

        <div className="order-info">
          <span style={{ whiteSpace: "nowrap" }}>
            <label>Name:</label>
            <input type="text" />
          </span>
          <span style={{ whiteSpace: "nowrap" }}>
            <label>Phone Number:</label>
            <input type="text" />
          </span>
          <span style={{ whiteSpace: "nowrap" }}>
            <label>Address:</label>
            <input type="text" />
          </span>
          <span style={{ whiteSpace: "nowrap" }}>
            <label>Quantity:</label>
            <input type="text" />
          </span>
          <span style={{ whiteSpace: "nowrap" }}>
            <label>Status:</label>
            <input type="text" />
          </span>

          <span>
            <button className="btn">Place an Order</button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
