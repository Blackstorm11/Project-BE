import axios from "axios";
import React from "react";
import { Link, Navigate} from "react-router-dom";
import login from "../../../assets/login.gif";
import "./login.css";



const Login = () => {

  function hoverOut() {
    var p = document.getElementById("pwd");
    p.setAttribute("type", "password");
  }

  function hoverIn() {
    var p = document.getElementById("pwd");
    p.setAttribute("type", "text");
  }

  const token = localStorage.getItem("token");

  let loggedIn=true;
  if(token == null){
    loggedIn=false
  }

  const custom_axios = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        Authorization: "Bearer" + token,
        Accept: "*/*",
        "Content-Type": "application/json"

    },
    timeout: 5000
});

  // const [email, setEmail] = React.useState('');
  // const [password, setPassword]=React.useState('');
  

const loginApp =async(e)=> {
  e.preventDefault();

  let email=document.getElementById("email").value;
  let password=document.getElementById("pwd").value;
  let loggedIn=false;

  if(email==""|| password==""){
    console.info("Please fill in the info");
    return;
  }
  try{
    const response = await custom_axios.post('/auth/login',{
      email: email,
      password: password,
    });
    localStorage.setItem("token", response.data.token);
    loggedIn=true;
    console.log(response);
    window.location.href="/dashboard"
    
  
  }catch(error){
    if(error.response.status== 401) console.warn(error.response.data.message);

  }
};

    // const [email, setEmail]= React.useState('');
    // const [password, setPassword]= React.useState('');
    // const handleLogin = async() => {
    //   let result = await fetch("http://localhost:3000/auth/login",{
    //     method: 'post',
    //     body: JSON.stringify({email,password}),
    //     headers:{
    //       'Content-Type': 'application/json'
    //     }
    //   });
    //   result= await result.json();
    //   console.warn(result);
    // }


  //   axios.post('http://localhost:3000/auth/login', data)
  //     .then(res =>{
  //       console.log(res)
  //     })
  //     .catch(err=>{
  //       console.log(err)
  //     })
  // }

  return (
    <div className="card position-absolute top-50 start-50 translate-middle">
      <div className="card-body">
        <form onSubmit={loginApp}>
          <div>
            <div className="img-box">
              <img className="img" alt="..." src={login} />
            </div>
            <div className="label">
              <label id="login">Login</label>
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter Email"
                id="email"
                //  onChange={(e)=> setEmail(e.target.value)}
              
                aria-required
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <div id="pass">
                <input
                  type="password"
                  id="pwd"
                  className="form-control mt-1"
                  placeholder="Enter Password"
                  // onChange={(e)=> setPassword(e.target.value)}
                  aria-required

                />
                <i
                  className="fa fa-eye"
                  aria-hidden="true"
                  type="button"
                  id="eye"
                  onMouseOver={hoverIn}
                  onMouseLeave={hoverOut}
                ></i>
              </div>
              <label>
                <Link style={{ textDecoration: "none" }} to="/pass">
                  {" "}
                  Forgot Password?
                </Link>
              </label><bR></bR>
            </div>
            &nbsp;&nbsp;&nbsp;
            <div className="label">
              <button type="submit" onClick={loginApp} className="btn btn-primary">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;