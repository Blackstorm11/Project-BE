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
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="name" onChange={handleChange} />
      </label>
      <label>
        RollNo:
        <input type="text" name="rollNo" onChange={handleChange} />
      </label>
      <label>
        UniversityNo:
        <input type="text" name="UniversityNo" onChange={handleChange} />
      </label>
      <label>
        email:
        <input type="text" name="email" onChange={handleChange} />
      </label>
      <label>
        Semester:
        <input type="number" name="semester" onChange={handleChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" onChange={handleChange} />
      </label>
      <label>
        Upload:
        <input type="file" name="images" onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Register;
