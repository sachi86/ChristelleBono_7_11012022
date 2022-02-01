import React from 'react';
import { useHistory } from "react-router-dom";
import AuthService from '../../services/auth.service';
import UserService from '../../services/user.service';

const ButtonDeleteProfil = () => {
    const history = useHistory();
  
  const DeleteProfil = () =>{ 
     UserService.deleteProfil();
     AuthService.logout();
    let path = `/home`; 
    history.push(path);
  }

    return(
        <button className="btn" onClick={DeleteProfil}>Supprimer Profil</button>
    );

};






export default ButtonDeleteProfil;