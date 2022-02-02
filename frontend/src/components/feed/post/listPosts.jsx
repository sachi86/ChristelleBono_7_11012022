/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import PostsService from "../../../services/posts.service";
import React, { useEffect, useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import ButtonDeletePost from "./buttonDeletePost.component";

const ListPosts = () => {
const [data, setData] = useState([]);
const sessionUser =  JSON.parse(sessionStorage.user);
const sessionUserId = sessionUser.user_id;
useEffect(() => {
    PostsService.listPosts()
        const fetchPosts = async () => {
            const result = await PostsService.listPosts();
            setData(result.data);
            console.log(data);

        };
  fetchPosts();
}, [])
    return(
        <Fragment>
            
            {data.map(item =>(
                    <div className="post" PostUserId={item.user_id}>
                    <ul className="post_list">
                    <li className="post_items" key={item.post_id}><p className="post_author">{item.User.firstname} {item.User.lastname}</p></li>
                    <li className="post_items" ><p className="post_title">{item.title}</p></li>
                    <li className="post_items" ><img className="post_mediaURL" src={item.mediaURL} crossorigin="anonymous" alt="media post" /></li>
                    {item.user_id === sessionUserId ? <ButtonDeletePost postId={item.post_id}/> : null}
                    </ul>
                    </div>
            ))}
            
        </Fragment>
    )
}

export default ListPosts;