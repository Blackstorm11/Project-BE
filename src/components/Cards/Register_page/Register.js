import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "./register.css";

const Register = () => {
  const nevigate=useNavigate()

 
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    semester: "",
    rollNo: "",
    UniversityNo: "",
    images: "",
    email: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/track/add_user", formData)
      .then((response) => {
        nevigate('/dashboard')
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="box position-absolute top-50 start-50 translate-middle">
    <div className="card-body" >
    <form onSubmit={handleSubmit} class="registration-form">
  <div class="form-group">
    <label for="Username">Username:</label>
    <input type="text" id="Username" placeholder="Enter your name" name="name" onChange={handleChange}/>
  </div>
  <div class="form-group">
    <label for="Roll NO">Roll NO:</label>
    <input type="text" id="Roll NO"  placeholder="Enter your RollNo" name="rollNo" onChange={handleChange}/>
  </div>
  <div class="form-group">
    <label for="UniversityNo">UniversityNo</label>
    <input type="text" id="UniversityNo"  placeholder="Enter your UniversityNo" name="UniversityNo" onChange={handleChange} />
  </div>
  <div class="form-group">
    <label for="Email">Email</label>
    <input type="Email" id="Email" placeholder="Enter your Email" name="email" onChange={handleChange} />
  </div>
  <div class="form-group">
    <label for="Semester">Semester</label>
    <input type="text" id="Semester"  placeholder="Confirm your Semester" name="semester" onChange={handleChange} />
  </div>
  <div class="form-group">
    <label for="Password">Password:</label>
    <input type="Password" id="Password"  placeholder="Confirm your Password" name="Password" onChange={handleChange} />
  </div>
  <div class="form-group">
    <label for="Semester">Upload:</label>
    <input type="file" id="Semester"  name="images" onChange={handleChange} />
  </div>
     
  <div class="form-group">
    <button type="submit">Register</button>
  </div>
</form>

    
    
    </div>
    </div>
  );
};

export default Register;
