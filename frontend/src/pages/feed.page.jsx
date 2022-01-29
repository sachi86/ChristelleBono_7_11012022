import React from 'react';
import HelloUser from '../components/feed/helloUser.component';
import ProfilInfo from '../components/profil/profil.component';
import CreatePost from '../components/feed/post/createPost';

const Feed = () => {
    return (
        <div className="feed">
        <HelloUser/>
        <ProfilInfo/>
        <CreatePost/>
        </div>
    );
};

export default Feed;