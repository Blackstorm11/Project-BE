import React from "react";
import {useState,useEffect} from 'react';

import "./attendance_log.css";

const Attendance=()=>{

  const[result,setResult]= useState([]);
 
  const getData = ()=>
  {
      fetch('')
      .then(response => response.json())
      .then(res => setResult( res));
  }
  
  useEffect(() => {
      getData();
  },)


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
          
          <button>Click </button>
        </div>
      </div>
       </div>
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                {/* Table with generated data 
                   <table className="table" id="table-to-xls">
                    <thead className="thead-dark">
                    <tr>
                        <th>Date</th>
                        <th></th>
                        <th>Student Name</th>
                        <th>Roll No</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                   
                         {result.map((res)=>
                            <tr>
                            <td>{res.name}</td>
                            <td>{res.username}</td>
                            <td>{res.email}</td>
                            </tr>
                          )}   
                       
                    </tbody>   
                </table> */}




{/* Button to download csv file */}
              





        
        
        </div>
        
        
        </>
    )
}
export default Attendance