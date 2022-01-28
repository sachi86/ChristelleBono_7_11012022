/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const ApiKeyAuth = process.env.REACT_APP_API_URL + "api/auth/";

const signup = (firstname, lastname, service, email, password) => {
  console.log("hello hello!")
  return axios.post(ApiKeyAuth +"signup", {
    firstname,
    lastname,
    service,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(ApiKeyAuth + "login", {
      username,
      password,
    })
    .then((res) => {
      if (res.data.token) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }

      return res.data;
    });
};


export default {
  signup,
  login,
};

