/* eslint-disable jsx-a11y/img-redundant-alt */
import PostsService from "../../../services/posts.service";
import React, { useEffect, useState } from "react";
import { Fragment } from "react/cjs/react.production.min";


const ListPosts = () => {
const [data, setData] = useState([]);

useEffect(() => {
    PostsService.listPosts()
        const fetchPosts = async () => {
            const result = await PostsService.listPosts();
            setData(result.data);
            console.log(result.data);
        };
  fetchPosts();
}, [])
    return(
        <Fragment>
            <ul>
            {data.map(item =>(
                <><li key={item.id}><p>{item.User.firstname} {item.User.lastname}</p></li>
                <li key={item.id}><p>{item.title}</p></li>
                <li key={item.id}><img className="mediaURL" src={item.mediaURL} crossorigin="anonymous" alt="media post"/></li></>
            ))}
            </ul>
        </Fragment>
    )
}

export default ListPosts;