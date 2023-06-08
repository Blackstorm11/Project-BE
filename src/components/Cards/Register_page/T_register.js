import React, { useState } from 'react';
import { BsCloudy } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.css';
import { toast } from "react-toastify";

const RegistrationPage = () => {
  const nevigate=useNavigate()
  const [Username, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');

  const handleSubmit = (event) => {
    console.log(event)
    event.preventDefault();
    const response=fetch("http://localhost:3001/faculty-m", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ Username, email, password, subject })

    }
    )
    .then((response) => {
      nevigate('/')
      console.log(response);
      toast.success('user Registered')
    })
    
    
    
    // Perform registration logic here
    // You can send the form data to a server or handle it as per your requirements

    // Clear form fields after submission
    setName('');
    setSubject('');
    setEmail('');
    setPassword('');
    setReferralCode('');
  };

  return (
    <div className="registration-container">
      <h2>Registration Page</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Username">Name:</label>
          <input
            type="text"
            id="name"
            value={Username}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="referralCode">Referral Code:</label>
          <input
            type="text"
            id="referralCode"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
          />
        </div> */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationPage;
