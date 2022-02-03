/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-restricted-globals */
import React from 'react';
import { useHistory } from "react-router-dom";
import { authHeaderShort } from '../../../services/auth-header';
import axios from 'axios';
const ApiKeyPost = process.env.REACT_APP_API_URL + "/api/posts/"


function ButtonDeletePost({postId}) {

    const history = useHistory();

      function handleClick(e) {
        console.log(postId);
        e.preventDefault();
        axios.delete(ApiKeyPost + postId ,  
          { headers: {Authorization: authHeaderShort(),
            'Content-Type': 'multipart/form-data'} } )
            document.location.reload()
        let path = `/feed`; 
      history.push(path);
    }

  return (
    <button className="btn"  onClick={handleClick}>Supprimer</button>
  );
}

export default ButtonDeletePost;