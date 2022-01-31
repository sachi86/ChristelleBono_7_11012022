/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import authHeader from "./auth-header";
const ApiKeyPosts = process.env.REACT_APP_API_URL + "/api/";


const CreatePost = (title, mediaURL) => {

    return axios.post(ApiKeyPosts +"posts", {
      title,
      mediaURL

    },{ headers: authHeader() })
  };


  export default {
      CreatePost
  }