import React, { useState } from 'react';
import { Link} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import "./card_one.css"
import Header from '../Header';
const Card_one = () => {
  const [value, onChange] = useState(new Date());



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
          {/* he */}
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

        <br></br>



       </div>
    </div>
    </> 
  );
}


export default Card_one;






{/* Time table */}

{/* <h1>Time Table</h1>
        <br></br>
<table  id="table-to-xls">
                   
                    <tr className='table-row' >
                    <td >Time</td>
                    <td>Monday</td>
                    <td>Tuesday</td>
                    <td>Wednesday</td>
                    <td>Thrusday</td>
                    <td>Friday</td>
                    </tr>
                    
                    <tbody>
                   
                    <tr>
          <td>9:15-10:15</td>
          <td>MSA</td>
          <td>PORJECT</td>
          <td>MSA</td>
          <td>PROJECT</td>
          <td>PROJECT</td>
          
        </tr>
        <tr>
            <td>10:15-11:15</td>
            <td>CTNS</td>
            <td>PROJECT</td>
            <td>NPTEL</td>
            <td>PROJECT</td>
            <td>PROJECT</td>
        </tr>
        <tr>
            <td>11:15-12:15</td>
            <td>NPTEL</td>
            <td>PROJECT</td>
            <td>CTNS</td>
            <td>PROJECT</td>
            <td>PROJECT</td>
        </tr>
        <tr>
            <td>12:15 - 1:00</td>
            <td>MSA</td>
            <td>PROJECT</td>
            <td>MSA</td>
            <td>PROJECT</td>
            <td>PROJECT</td>
        </tr>
        <tr>
            <td>2:00-3:00</td>
            <td>CTNS</td>
            <td>PROJECT</td>
            <td>NPTEL</td>
            <td>PROJECT</td>
            <td>PROJECT</td>
        </tr>     
                   </tbody>   
                </table>
               

    <br></br><br></br> 
    <center>
   <button  type="submit" className="btn2 " >
    Take Attendance
    </button>
    </center> */}