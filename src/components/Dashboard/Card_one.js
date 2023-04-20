import React, { useState } from 'react';
import { Link} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import "./card_one.css"

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
