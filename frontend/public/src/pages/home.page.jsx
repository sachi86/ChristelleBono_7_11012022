import React from 'react';
import Log from '../components/LogSign/log.component';

const Home = () => {
    return (
        <div className="home">
            <div className="home_profil">
                <div className="home_profil_log">
                    <Log signIn={false} signUp={true} />
                </div>
            </div>
        </div>
    );
};

export default Home;