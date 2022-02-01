/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import {authHeaderShort} from "./auth-header";
const ApiKeyPosts = process.env.REACT_APP_API_URL + "/api/";


const CreatePost = (data) => {
    return axios.post(ApiKeyPosts +"posts", data,
    { headers: {Authorization: authHeaderShort(),'Content-Type': 'multipart/form-data'} },
    )
  };


  export default {
      CreatePost
  }