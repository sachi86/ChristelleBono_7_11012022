/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import authHeader from "./auth-header";
import { authHeaderShort } from "./auth-header";
const ApiKeyProfil = process.env.REACT_APP_API_URL + "/api/profil/";


const getOneProfil = () => {
  const userAuth = JSON.parse(sessionStorage.user);
    return axios.get(ApiKeyProfil + userAuth.user_id, { headers: authHeader() 
    })

  };

  const updateProfil = (firstname, lastname, service, email) => {
    const userAuth = JSON.parse(sessionStorage.user);
 
    return axios.post(ApiKeyProfil + userAuth.user_id,{
      firstname,
      lastname,
      service,
      email,
    },{ headers: {Authorization: authHeaderShort(),'Content-Type': 'application/json'} })
  };

  const deleteProfil = () => {
    const userAuth = JSON.parse(sessionStorage.user);
      return axios.delete(ApiKeyProfil + userAuth.user_id, { headers: authHeader() 
      })
    };

export default {
    getOneProfil,
    updateProfil,
    deleteProfil
}


