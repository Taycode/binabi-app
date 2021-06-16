import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./LogIn.css";

function LogInForm() {
  const [admin, setAdmin] = useState({ userName: "", password: "" });

  const handleClick = () => <Link to="/dashboard"></Link>;

  return (
    <div className="login">
      <h1>LOG IN</h1>

      <form>
        <div>
          <label>Username:</label>
          <input
            type="text"
            required
            value={admin.userName}
            onChange={(e) => setAdmin({ ...admin, userName: e.target.value })}
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            required
            value={admin.password}
            onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
          />
        </div>

        {admin.userName === "admin@binabi@gmail.com" &&
        admin.password === "admin@binabi" ? (
          <Link to="/dashboard">
            <button className="btn" onClick={handleClick}>
              Log In
            </button>
          </Link>
        ) : null}
      </form>
    </div>
  );
}

export default LogInForm;
