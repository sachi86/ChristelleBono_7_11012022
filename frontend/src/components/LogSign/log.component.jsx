import React, { useState } from 'react';
import SignUp from './signUp.component';
import Login from './login.component';

const Log = ( props ) => {
    const [signUpModal, setSignUpModal] = useState(props.signUp);
    const [loginModal, setLoginModal] = useState(props.login);

    const handleModals = (e) => {
        if(e.target.id === "register") {
            setLoginModal(false);
            setSignUpModal(true);
        } else if (e.target.id === "login") {
            setSignUpModal(false);
            setLoginModal(true);
        }
    };

    return (
        <div className="container_form home_container">
                <ul>
                    <li onClick={handleModals} id="register" className={signUpModal ? "active-btn" : null} >S'inscrire</li>
                    <li onClick={handleModals} id="login" className={loginModal ? "active-btn" : null} >Se connecter</li>
                </ul>
                {signUpModal && <SignUp />}
                {loginModal && <Login />}
        </div>
    );
};

export default Log;