import React from "react";
import { Link, Navigate} from "react-router-dom";
import "./register.css";



const Register = () => {
  return (
    <div className="box position-absolute top-50 start-50 translate-middle">
      <div className="card-body">
        <form >
          <div>
            
            <div className="label">
              <label id="login">Registration</label>
            </div>
            {/* Name */}
            <div className="form-group mt-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter Name"
                id="email"

                aria-required
              />
            </div>
            {/* RollNo */}
            <div className="form-group mt-3">
              <label>Roll No</label>
              <div id="pass">
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Enter RollNo"
                  aria-required
                />
                </div>
                {/* Sem */}
                <div className="form-group mt-3">
              <label>Semester</label>
              <div id="pass">
                <input
                  type="number"
                  className="form-control mt-1"
                  placeholder="Enter Semester"
                  aria-required
                />
                </div>
                {/* UNiversity Number */}
                <div className="form-group mt-3">
              <label>University Number</label>
              <div id="pass">
                <input
                  type="number"
                  className="form-control mt-1"
                  placeholder="Enter Number"
                  aria-required
                />
                </div>
                </div>
                 {/* Email */}
                 <div className="form-group mt-3">
              <label>Email</label>
              <div id="pass">
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Enter Email"
                  aria-required
                />
                </div>
                </div>
                   {/* Password*/}
                   <div className="form-group mt-3">
              <label>Password</label>
              <div id="pass">
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter Password"
                  aria-required
                />
                </div>
                </div>
                <i
                  className="fa fa-eye"
                  aria-hidden="true"
                  type="button"
                  id="eye"
           
                ></i>
              </div>
            </div>
            &nbsp;&nbsp;&nbsp;
            <div className="label">
              <button type="submit"  className="btn btn-primary">
                Capture
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;