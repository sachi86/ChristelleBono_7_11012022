/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */

import React, {  useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import ButtonDeletePost from "./buttonDeletePost.component";
import { authHeaderShort } from '../../../services/auth-header';
import axios from 'axios';
const ApiKeyPost = process.env.REACT_APP_API_URL + "/api/posts/"


const Post = ({post}) => {

    const sessionUser =  JSON.parse(sessionStorage.user);
    const sessionUserId = sessionUser.user_id;
    const [title, setTitle] = useState(post.title);
    const handleChangeTitle = (event) => {
    setTitle(event.target.value);
   
} 

const modify = (postId) => {
    axios.put(ApiKeyPost + postId ,{title},
        { headers: {Authorization: authHeaderShort(), 
          'Content-Type': 'application/json'} })

}
    return(
        <Fragment>
                    <div className="post" PostUserId={post.user_id}>
                    <ul className="post_list">
                    <li className="post_items" key={post.post_id}><p className="post_author">{post.User.firstname} {post.User.lastname}</p></li>
                    <label className="form_label" name='titlePost' htmlFor='titlePost'>Votre publication</label>
                    <input className="post_title" id="titlePost" value={title} onChange={handleChangeTitle}/>
                    <li className="post_items" ><img className="post_mediaURL" src={post.mediaURL} crossorigin="anonymous" alt="media post" /></li>
                    <div>
                    {post.user_id === sessionUserId ? <ButtonDeletePost postId={post.post_id}/> : null}
                    {post.user_id === sessionUserId ?<button onClick={() => modify(post.post_id)} className="btn">Modifier</button> : null}
                    </div>
                    </ul>
                    </div>
        </Fragment>
    )
}

export default Post;