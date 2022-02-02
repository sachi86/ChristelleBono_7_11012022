/* eslint-disable no-restricted-globals */
import React from 'react';
import { useHistory } from "react-router-dom";
import PostsService from '../../../services/posts.service';


function ButtonDeletePost() {

  const history = useHistory();

  function handleClick(e) {

    e.preventDefault();
    PostsService.deletePost() 
    let path = `/feed`; 
    history.push(path);
  }

  return (
    <button className="btn"  onClick={handleClick}>Supprimer</button>
  );
}



export default ButtonDeletePost;