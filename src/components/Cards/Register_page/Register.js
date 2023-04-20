import React from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "./register.css";

const Register = () => {
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
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="box position-absolute top-50 start-50 translate-middle">
    <div className="card-body" >
    <form onSubmit={handleSubmit}>
    <div className="label">
      <label>
        Username:
        <input type="text" name="name" onChange={handleChange} />
      </label>
      <hr></hr>
      <label>
        RollNo:
        <input type="text" name="rollNo" onChange={handleChange} />
      </label>
      <hr></hr>
      <label>
        UniversityNo:
        <input type="text" name="UniversityNo" onChange={handleChange} />
      </label>
      <hr></hr>
      <label>
        email:
        <input type="text" name="email" onChange={handleChange} />
      </label>
      <hr></hr>
      <label>
        Semester:
        <input type="number" name="semester" onChange={handleChange} />
      </label>
      <hr></hr>
      <label>
        Password:
        <input type="password" name="password" onChange={handleChange} />
      </label>
      <hr></hr>
      <label>
        Upload:
        <input type="file" name="images" onChange={handleChange} />
      </label>
      <hr></hr>
      <button type="submit">Submit</button>
      </div>
    </form>
    
    
    </div>
    </div>
  );
};

export default Register;
