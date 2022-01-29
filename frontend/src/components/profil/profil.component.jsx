import UserService from "../../services/user.service";
import React, { useEffect, useState } from "react";


const ProfilInfo = () => {
const [ firstname, setFirstname] = useState("");
const [ lastname, setLastname] = useState("");
const [ service, setService] = useState("");
const [ email, setEmail] = useState("");
const [ avatarProfil, setAvatarProfil] = useState("");

useEffect(() => {
    UserService.getOneProfil()
        .then((res) =>{
            setFirstname(res.data.firstname);
            setLastname(res.data.lastname);
            setService(res.data.service);
            setEmail(res.data.email);
            setAvatarProfil(res.data.avatarProfil);
        })
        .catch(err => { 'error to profil' });
})
    return(
        <section className="profil_card">
            <img className="profil_card_image" src= {avatarProfil} alt="avatar de profil" />
            <div className="profil_card_information">
                <ul className="profil_card_information_list">
                    <li profil_card_information_list_item>Prénom : {firstname}</li>
                    <li profil_card_information_list_item>Nom : {lastname}</li>
                    <li profil_card_information_list_item>Service : {service}</li>
                    <li profil_card_information_list_item>Email: {email}</li>
                </ul>
            </div>
        </section>
    )
}

export default ProfilInfo;