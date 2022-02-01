import React from 'react';
import { useHistory } from "react-router-dom";
import AuthService from '../../services/auth.service';

const ButtonDeletePost = () => {
    const history = useHistory();
  
  const DeletePost = () =>{ 
    PostsService.logout();
    let path = `/feed`; 
    history.push(path);
  }

    return(
        <button className="btn" onClick={DeletePost}>Se déconnecter</button>
    );

};






export default ButtonDeletePost;