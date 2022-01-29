/* eslint-disable jsx-a11y/heading-has-content */
import UserService from "../../services/user.service";
import React, { useEffect, useState } from "react";
import ButtonUpdateProfil from "../profil/buttonUpdateProfil.component";


const ProfilInfo = () => {
const [ firstname, setFirstname] = useState("");
const [ lastname, setLastname] = useState("");
const [ service, setService] = useState("");
const [ avatarProfil, setAvatarProfil] = useState("");

useEffect(() => {
    UserService.getOneProfil()
        .then((res) =>{
            setFirstname(res.data.firstname);
            setLastname(res.data.lastname);
            setService(res.data.service);
            setAvatarProfil(res.data.avatarProfil);
        })
        .catch(err => { 'error to profil' });
})
    return(
        <section className="profil_card">
            <h2>Votre profil</h2>
            <img className="profil_card_image" src= {avatarProfil} alt="avatar de profil" />
            <div className="profil_card_information">
                <ul className="profil_card_information_list">
                    <li profil_card_information_list_item>Prénom : {firstname}</li>
                    <li profil_card_information_list_item>Nom : {lastname}</li>
                    <li profil_card_information_list_item>Service : {service}</li>
                </ul>
            </div>
            <ButtonUpdateProfil/>
        </section>
    )
}

export default ProfilInfo;