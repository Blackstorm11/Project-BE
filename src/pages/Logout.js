import React from "react";
import Card_one from "../components/Dashboard/Card_one";
import Navbar from "../components/Navbar/Navbar";


export default function Logout() {  

  localStorage.removeItem("token");

  return (
    <>  
        <div>
            <h1>You have been logged out!!</h1>


            
        </div>
    </>
  );
}
