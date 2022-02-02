/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import PostsService from "../../../services/posts.service";
import React, { useEffect, useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import ButtonDeletePost from "./buttonDeletePost";

const ListPosts = () => {
const [data, setData] = useState([]);

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
                <ul className="post">
                    <li className="post_items" key={item.id}><p className="post_author">{item.User.firstname} {item.User.lastname}</p></li>
                    <li className="post_items" ><p className="post_title">{item.title}</p></li>
                    <li className="post_items" ><img className="post_mediaURL" src={item.mediaURL} crossorigin="anonymous" alt="media post" /></li>
                </ul>
            ))}
            
        </Fragment>
    )
}

export default ListPosts;