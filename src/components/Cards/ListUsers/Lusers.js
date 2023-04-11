import React, { Component } from "react";
import "./lusers.css"

export class Lusers extends Component {

  componentDidMount() {
    
    let url = "https://api.github.com/users/costaivo";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        document.getElementById("username").innerHTML = `
        <p>${data.login}</p>
        `
        document.getElementById("bio").innerHTML = `
        <p>${data.bio}</p>
        `
        document.getElementById("dp").src = `
        <img src="${data.avatar_url}" ></img>
        `
      });
  }


  render() 
    {
      return (
      <>
        <div class="card mb-3 mx-auto me-auto" id="dt">
        <div class="row g-0 py-2">
            <div class="col-md-3 px-5">
              <img id="dp"></img>
            </div>
            <div class="col-md-8 mx-auto me-auto">
            <div class="card-body">
              <h2 class="card-title" id="username"></h2>
              <p class="card-text" id="bio"></p>   
            </div>
            </div>
        </div>
        </div>
      </>
      )
    };
  }

export default Lusers;
