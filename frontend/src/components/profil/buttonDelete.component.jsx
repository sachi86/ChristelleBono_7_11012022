/* import React from 'react';
import { useHistory } from "react-router-dom";
import UserService from '../../services/user.service';

const ButtonDelete = () => {
    const history = useHistory();
  
  const deleted = () =>{ 
    UserService.deleteProfil();
    sessionStorage.remove()
    let path = `/home`; 
    history.push(path);
  }

    return(
        <button className="btn" onClick={deleted}>Supprimer Profil</button>
    );

};

export default ButtonDelete; */