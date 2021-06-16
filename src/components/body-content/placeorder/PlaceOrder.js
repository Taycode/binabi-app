import React from "react";
import "./PlaceOrder.css";

function PlaceOrder(props) {
  // const detailsOfCustomer = useContext(nameContext);
  // console.log(detailsOfCustomer);
  console.log(props.name);

  return (
    <div className="placeorder-section">
      <h1>Welcome. Place your order.</h1>
    </div>
  );
}

export default PlaceOrder;
