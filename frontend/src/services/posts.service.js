/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import authHeader from "./auth-header";
const ApiKeyPosts = process.env.REACT_APP_API_URL + "/api/";


const CreatePost = (post_id, title, mediaURL, likes, user_id) => {

    return axios.post(ApiKeyPosts +"posts", {
      post_id,
      title,
      mediaURL,
      likes,
      user_id,
    },{ headers: authHeader() })
  };


  export default {
      CreatePost
  }