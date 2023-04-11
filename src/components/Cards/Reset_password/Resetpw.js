import React from "react";
import "./Resetpw.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Resetpw() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const PasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const resetPassword = () => {
    if (password == confirmPassword) {
      console.log("equal");
    } else {
      console.log("wrong");
    }
  };

  return (
    <>
      <div className="container resetContainer">
        <form className="resetForm">
          <div className="resetHeading">
            <h1>Reset Password !!</h1>
          </div>
          <input
            type="password"
            placeholder="enter password"
            id="password"
            onChange={PasswordHandler}
            required
          />
          <br></br>
          <input
            type="password"
            placeholder="confirm password"
            id="confirmpassword"
            onChange={confirmPasswordHandler}
            required
          />
          <br></br>
          <div className="buttons">
            <button className="resetButton" onClick={resetPassword}>
              Reset
            </button>
            <Link className="resetCancelButton" to="/">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
