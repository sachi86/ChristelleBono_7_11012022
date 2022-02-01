import UserService from "../../services/user.service";
import React, { useEffect, useState } from "react";

const HelloUser = () => {

const [ firstname, setFirstname] = useState("");
const [ avatarProfil, setAvatarProfil] = useState("");

useEffect(() => {
    UserService.getOneProfil()
        .then((res) =>{
            setFirstname(res.data.firstname);
            setAvatarProfil(res.data.avatarProfil);

        })
        .catch(err => { 'error to profil' });
})
    return(
        <section className="HelloUser">
            <h2 className="titlePage">Bonjour {firstname} !</h2>
            <img className="HelloUser_avatar" src= {avatarProfil} onerror="this.onerror=null; this.src='../../images/avatar.jpg'" alt="avatar de profil" />
            {/* <button className="btn" onClick={Profil}>Voir Profil</button> */}
        </section>
    )
}

export default HelloUser;