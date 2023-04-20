import React from "react";
import {useState,useEffect} from 'react';

import "./attendance_log.css";

const Attendance=()=>{

  const[result,setResult]= useState([]);
 
  const getData = ()=>
  {
      fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(res => setResult( res));
  }
  
  useEffect(() => {
      getData();
  },)

// Toggle Content
const[show,setShow]=useState(false)



    return(
        <>

  <div className="container3">
              
              
  <div class="box4">
  <br></br>
    <center><h1>Attendance Log</h1></center>
        <br></br>
        
        <div class="a_users">
        <div class="a_card">
          
          <h4>FY</h4>

          <button>Click </button>
        </div>

        <div class="a_card">
          
          <h4>SY</h4>
          
          <button>Click</button>
        </div>

        <div class="a_card">
          
          <h4>TY</h4>
          
          <button>Click</button>
        </div>

        <div class="a_card">
          
          <h4>BE</h4>
          
          <button onClick={()=>setShow(!show)}>Click </button>
        </div>
      </div>
       
             <br></br>     <br></br> 
                
                
                
                {/* Toggle Content */}
{
  show?<table>
        <thead>
      <tr>
        <th>Sr.No</th>
        <th>Student Name</th>
        <th>Roll No</th>
        <th>Status</th>
    </tr>
        </thead>
      <tbody>
          {result.map((res)=>
             <tr>
              <td>{res.id}</td>
              <td>{res.name}</td>
              <td>{res.phone}</td>
              <td>{res.username}</td>
              </tr>
           )}   
       </tbody>
                    
                  </table>:null
}
                
                
                
                </div>    
        </div>
        
        
        </>
    )
}
export default Attendance