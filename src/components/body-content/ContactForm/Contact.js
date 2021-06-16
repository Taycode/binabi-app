import React, { useState } from "react";
import "./ContactSection.css";
// import { Link } from "react-router-dom";

function Contact() {
  const [name, setName] = useState({ yourName: "", phoneNumber: "" });
  const { yourName, phoneNumber } = name;
  const handleSubmit = () => {
    const your = String(yourName);
    const phone = Number(phoneNumber);
    if (typeof your === "string" && typeof phone === "number") {
      alert(
        `Thank you, ${your}. Your order has been taken. We will reach you soon: ${phone}`
      );
    } else {
      alert("Fill your details correctly.");
    }
  };

  return (
    <div className="contact-section">
      <h1>CONTACT US</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Your Name: </label>
          <input
            type="text"
            value={yourName}
            onChange={(e) => setName({ ...name, yourName: e.target.value })}
          />
        </div>

        <div>
          <label>Your Phone Number: </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setName({ ...name, phoneNumber: e.target.value })}
          />
        </div>

        <div>
          <label>Your Email Address: </label>
          <input type="text" />
        </div>

        <div className="anither">
          {/* <label>
            {yourName} {phoneNumber}
          </label> */}
        </div>

        {/* <Link to="/placeorder"> */}
        <button className="btn">Place an Order</button>
        {/* </Link> */}
      </form>
    </div>
  );
}

export default Contact;
