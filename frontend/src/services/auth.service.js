/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const ApiKeyAuth = process.env.REACT_APP_API_URL + "/api/auth/";

const signup = (firstname, lastname, service, email, password) => {
  console.log("hello hello!");
  console.log("firstname : ", firstname);
  console.log("lastname : ",lastname);
  console.log("service : ", service);
  console.log("email : ", email);
  console.log("password : ",password);

  return axios.post(ApiKeyAuth +"signup", {
    firstname,
    lastname,
    service,
    email,
    password,
  })
};

const login = (email, password) => {
  console.log("email : ", email);
  console.log("password : ",password);
  return axios.post(ApiKeyAuth + "login", {
      email,
      password,
    })
    .then((res) => {
      if (res.data.token) {
        sessionStorage.setItem("user", JSON.stringify(res.data));
      }
      return res.data;
    });
};


export default {
  signup,
  login,
};

