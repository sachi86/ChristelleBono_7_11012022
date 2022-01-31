import React from 'react';
import { useHistory } from "react-router-dom";
import AuthService from '../../services/auth.service';

const ButtonLogout = () => {
    const history = useHistory();
  
  const logout = () =>{ 
    AuthService.logout();
    let path = `/home`; 
    history.push(path);
  }

    return(
        <button className="btn" onClick={logout}>Se déconnecter</button>
    );

};






export default ButtonLogout;