import React from 'react';
import HelloUser from '../components/feed/helloUser.component';
import ProfilInfo from '../components/profil/profil.component';
import CreatePost from '../components/feed/post/createPost.component';
import ListPosts from  '../components/feed/post/listPosts.component';

const Feed = () => {
    return (
        <div className="feed">
        <HelloUser/>
        <ProfilInfo/>
        <CreatePost/>
        <ListPosts/>
        </div>
    );
};

export default Feed;