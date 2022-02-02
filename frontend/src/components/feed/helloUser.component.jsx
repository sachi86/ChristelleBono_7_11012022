import UserService from "../../services/user.service.js";
import React, { useEffect, useState } from "react";

const HelloUser = () => {

const [ firstname, setFirstname] = useState("");

useEffect(() => {
    UserService.getOneProfil()
        .then((res) =>{
            setFirstname(res.data.firstname);


        })
        .catch(err => { 'error to profil' });
})
    return(
        <div className="helloUser">
            <h2 className="titlePage">Bonjour {firstname} !</h2>
        </div>
    )
}

export default HelloUser;