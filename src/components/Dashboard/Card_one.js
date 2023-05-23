import React, { useState,useEffect } from 'react';
import { Link} from "react-router-dom";
import "./card_one.css"


const Card_one = () => {
  const [value, onChange] = useState(new Date());

  const[result,setResult]= useState([]);
 
  const getData = ()=>
  {
      fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(res => setResult( res));
  }

  const getData1 = ()=>
  { 
      fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(res => setResult( res));
  }
  
 
  useEffect(() => {
      getData();
      getData1();
     
     
  },)
// GRAPH




  return (
   <>   
    
    <div className="container1">

       <div class="box2">
       <br></br>  <br></br>
        
        <div class="users">
        <div class="card">
          
          <h4>FY</h4>

          <button>Click</button>
        </div>

        <div class="card">
          <h4>SY</h4>
          
          <button>Click</button>
        </div>

        <div class="card">
          
          <h4>TY</h4>
          
          <button>Click</button>
        </div>

        <div class="card">
          
          <h4>BE</h4>
          <Link className="nav-link " aria-current="page" to="/time_table">
              <button > Click</button>  
            </Link>
           
        </div>
      </div>

        <br></br>   <br></br>   <br></br>
        {/* below 2 cards */}
      <div class="split_both">
        <div className='split1'>
       
        <div class="users">
        <div class="card">
          
          <h2>Teachers</h2>
    <p>{result.map((res)=>
              <>{res.id}</> 
           )}</p>
        </div>

        <div class="card">
          <h2>Students</h2>
          <p>{result.map((res)=>
              <>{res.id}</> 
           )}</p>
        </div>

        </div>  

<br></br>

      

{/* names of teachers and students */}
      <div class="st_names">
              <h2>Faculty Members Details</h2>
              
            {/* faculty details */}
            <div class="t_details">
<div style={{ overflow: 'auto', height: '300px' }}>
      <table>
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Name</th>
            <th>Email id</th>
            <th>Qualification</th>
          </tr>
        </thead>
        <tbody>
        {result.map((res)=>
          
            <tr>
              <td>{res.id}</td>
              <td>{res.name}</td>
              <td>{res.email}</td>
              <td>{res.username} </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
            </div>
            </div>
            
<br></br>

            {/* student details */}
            <div class="st_names">
              <h2>Student Details</h2>
             
            {/* Student details */}
            <div class="t_details">
<div style={{ overflow: 'auto', height: '300px' }}>
      <table>
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Name</th>
            <th>Roll No</th>
            <th>Email id</th>
          </tr>
        </thead>
        <tbody>
        {result.map((res)=>
          
            <tr>
              <td>{res.id}</td>
              <td>{res.name}</td>
              <td>{res.id}</td>
              <td>{res.email} </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
            </div>
            </div>
            </div>

            </div>
            
            
            
        
            {/* other half */}
  

            </div>
      </div> 

     
  
    </> 
  );
}


export default Card_one;