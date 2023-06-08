import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Main_register.css';


function Main_register() {
  const handleButtonClick = (buttonName) => {
    console.log(`Button ${buttonName} clicked!`);
  };

  return (
    <div className="container2">

    
    <div class="card1">

       <Link  to="/register">
       <button >Register As Student</button> 
        </Link>

      <Link  to="/t_register">
       <button >Register As Teacher</button> 
        </Link>

    </div>
    </div>
  );
}

export default Main_register;
