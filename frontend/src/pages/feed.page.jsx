import React from 'react';
import HelloUser from '../components/feed/helloUser.component';
import ProfilInfo from '../components/profil/profil.component';
import CreatePost from '../components/feed/post/createPost';
import ListPosts from  '../components/feed/post/listPosts';

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