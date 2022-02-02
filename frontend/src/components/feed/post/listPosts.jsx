/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import PostsService from "../../../services/posts.service";
import React, { useEffect, useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import ButtonDeletePost from "./buttonDeletePost.component";
import Post from "./post";

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
                    <Post key={item.post_id} post={item}/>
            ))}
            
        </Fragment>
    )
}

export default ListPosts;