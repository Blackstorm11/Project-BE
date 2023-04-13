import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Add from "../components/Cards/Adduser/Add"

const Adduser = () => {
  const token=localStorage.getItem("token")

  let loggedIn=true;
  if(token==null){
    loggedIn=false;
  }
  if(loggedIn===false){
    window.location.href="/"
  }

  return (
    <>
     
      <Add/>
    </>
  );
}
export default Adduser;
