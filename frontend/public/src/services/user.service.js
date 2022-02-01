/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import authHeader from "./auth-header";
const ApiKeyProfil = process.env.REACT_APP_API_URL + "/api/profil/";

const user = JSON.parse(sessionStorage.user);

const getOneProfil = () => {

    return axios.get(ApiKeyProfil + user.user_id, { headers: authHeader() 
    })

  };

  const updateProfil = (firstname, lastname, service, email, password, avatarProfil) => {

    return axios.post(ApiKeyProfil +":user_id",{ headers: authHeader() }, {
      firstname,
      lastname,
      service,
      email,
      password,
      avatarProfil
    })
  };


export default {
    getOneProfil,
    updateProfil
}