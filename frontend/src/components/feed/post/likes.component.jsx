import React, { useEffect, useState } from "react";
import { authHeaderShort } from '../../../services/auth-header';
import axios from 'axios';
const ApiKeyPost = process.env.REACT_APP_API_URL + "/api/posts/"

const Likes = ({ postId }) => {

 
  const [btnlikes, setBtnlikes] = useState(false);

  const likeHandle = () => {
    /* if(btnlikes === false) {
      setBtnlikes(true);
    }else {
      setBtnlikes(false);
    } */
    setBtnlikes(!btnlikes) 
    
    useEffect( async () =>{
      const data = {
        user_id: JSON.parse(sessionStorage.getItem("user")).user_id,
        post_id: postId,
        likes:btnlikes
      };
  
      await axios.post(ApiKeyPost + postId +"/like" ,{data},
        { headers: {Authorization: authHeaderShort(), 
          'Content-Type': 'application/json'} })
    },[])
    

     return (
    <div className="interact">
      <div className="interact_like">
        <button className={btnlikes ? "btn_like" : null} onClick={likeHandle}>
          J'aime
        </button>
        
      </div>
    
    </div>
  );
};

export default Likes;
