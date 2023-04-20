import axios from "axios";

const token: string = "";

const customAxios = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        Authorization: "Bearer" + token,
        Accept: "*/*",
        "Content-Type": "application/json"

    },
    timeout: 5000
})
const data = {
    Username: "name",
    password: "password123",
    rollNo:"rollNo",
    semester:"4"
  };
  
  customAxios.post("http://localhost:3001", data)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  

export default customAxios;