import React, { useEffect, useState } from "react";
import { authHeaderShort } from '../../../services/auth-header';
import axios from 'axios';
const ApiKeyPost = process.env.REACT_APP_API_URL + "/api/posts/"

const Likes = ({ postId }) => {

 
  const [likes, setLikes] = useState(false);

  const likeHandle = async () => {
    const data = {
      user_id: JSON.parse(sessionStorage.getItem("user")).user_id,
      post_id: postId,
    };

    await axios.post(ApiKeyPost + postId +"/like" ,{data},
      { headers: {Authorization: authHeaderShort(), 
        'Content-Type': 'application/json'} })
    document.location.reload()
  };

  useEffect(() => {
    const ButtonLikeColor = async () => {
      const data = {
        postId,
        user_id: JSON.parse(sessionStorage.getItem("user")).user_id,
      };
      const response = await axios.post(ApiKeyPost + postId +"/like" ,{data},
        { headers: {Authorization: authHeaderShort(), 
          'Content-Type': 'application/json'} })
      if (response.data[0]) {
        setLikes(true);
      } else {
        setLikes(false);
      }
    };
    ButtonLikeColor();
  }, [postId]);

     return (
    <div className="to-interact">
      <div className="like">
        <button className={likes ? "btn_like" : null} onClick={likeHandle}>
          J'aime
        </button>
        
      </div>
    
    </div>
  );
};

export default Likes;
