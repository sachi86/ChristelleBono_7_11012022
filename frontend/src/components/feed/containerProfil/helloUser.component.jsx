import UserService from "../../../services/user.service";
import React, { useEffect, useState } from "react";
import ButtonShowProfil from "./buttonShowProfil.component";

const HelloUser = () => {

const [ firstname, setFirstname] = useState("");
const [ avatarProfil, setAvatarProfil] = useState("");

useEffect(() => {
    UserService.getOneProfil()
        .then((res) =>{
            setFirstname(res.data.firstname);
            setAvatarProfil(res.data.avatarProfil);
            console.log(firstname);
            console.log(avatarProfil);
        })
        .catch(err => { 'error to profil' });
})
    return(
        <section className="HelloUser">
            <h2 className="titlePage">Bonjour {firstname} !</h2>
            <img className="HelloUser_avatar" src= {avatarProfil} alt="avatar de profil" />
             <ButtonShowProfil/>
        </section>
    )
}

export default HelloUser;