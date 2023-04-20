import React from "react";
import { Link } from "react-router-dom";
import "./add.css";
import axios from "axios"
// import custom_axios from "../../../axios/AxiosSetup";
// import {ApiConstants} from "../../../api/ApiConstants"

const Add = () => {
  // const register = () => {};
  // const register = async()  =>{
  //   const response=await custom_axios.post(ApiConstants.USERS.ADD_USER, {
  //     firstname: "Athena",
  //     lastname: "Rodrigues",
  //     username: "athena46",
  //     email: "rodriguesathena46@gmail.com"
  //   });
  //   console.log(response.data);

  // };

  //   const token = "";

  // const custom_axios = axios.create({
  //     baseURL: 'http://localhost:3000',
  //     headers: {
  //         Authorization: "Bearer" + token,
  //         Accept: "*/*",
  //         "Content-Type": "application/json"

  //     },
  //     timeout: 5000
  // });

  
//   export default function App() {
//     const [post, setPost] = React.useState(null);
  
//     React.useEffect(() => {
//       custom_axios.get("/1").then((response) => {
//         setPost(response.data);
//       });
//     }, []);
  
//     async function register() {
//       custom_axios
//       .post(baseURL, {
//         firstname: "Athena",
//         lastname: "Rodrigues",
//         username: "athena46",
//         email: "rodriguesathena46@gmail.com"
//       })
//       .then((response) => {
//         setPost(response.data);
//       });
//       console.log(response.data);
//     }
//   }
const token=localStorage.getItem("token")

const register = async (e) => {
  e.preventDefault();
  // axios.get("https://quote-api-app.herokuapp.com/quote").then((response) => {
  //   console.log(response);
  //});

  //console.log("clicked");
  // try {
    
  //   const resp = axios.post("http://localhost:3000/users", {
  //     firstname: "pandu",
  //     lastname: "naik",
  //     username: "pandu123",
  //     email: "padnu@gmail.com"
  //   },
  //   );
  // } catch (error) {
  //   console.log(error.response);
  // }
};

  return (
    <div className="card position-absolute top-50 start-50 translate-middle">
      <div className="card-body">
        <form>
          <div>
            <div className="label">
              <label id="login">Add User</label>
            </div>
            <div className="form-group mt-3">
              <label>First Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter First Name"
                aria-required
              />
            </div>
            <div className="form-group mt-3">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter Last Name"
                aria-required
              />
            </div>
            <div className="form-group mt-3">
              <label>Github Username</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter Github username"
                aria-required
              />
            </div>
            <div className="form-group mt-3">
              <label>Office Email</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter Email"
                aria-required
              />
            </div>
            <div className="bt">
              <button onClick={register} className="btn btn-primary">
                Add User
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
