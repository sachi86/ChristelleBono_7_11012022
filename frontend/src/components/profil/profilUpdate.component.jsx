import React, {  useEffect, useState} from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
// import Regex from '../../utils/regex.util';
import UserService from '../../services/user.service';



const EditProfil = () => {


    
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [service, setService] = useState("");
    const [email, setEmail] = useState("");
    const [avatarProfil, setAvatarProfil] = useState("");

    const handleChange = (event, value) => {
        const targetId = event.target.getAttribute('id')
        console.log("debut",event);
        event.persist()
         switch (targetId) {
            case 'firstname': setFirstname(value)
                break;
            case 'lastname': setLastname(value)
                break;
            case 'service' : setService(value)
                break;
            case 'email' : setEmail(value)
                break;
            case 'avatarProfil' : setAvatarProfil(value)
                break;
                default:break;

        } 
    }
   /*  const handleChangeFirstname = (event) => {
        setFirstname(event.target.value);
       
    } */
    useEffect(() => {
        UserService.getOneProfil()
        
        .then((res) =>{
            console.log(res.data);
            setFirstname(res.data.firstname);
            setLastname(res.data.lastname);
            setService(res.data.service);
            setEmail(res.data.email);
            if (res.data.avatarProfil) setAvatarProfil(res.data.avatarProfil)
              else setAvatarProfil("../../images/avatar.jpg");
        })
    }, []);

    
      const onSubmit = async (e) => {
        e.preventDefault();
    

        // newProfil.append("avatarProfil", document.getElementById("avatarProfil").files[0])
    
        await UserService.updateProfil(firstname,lastname,service,email,avatarProfil);

    //     const user_id = JSON.parse(sessionStorage.getItem("user")).user_id;
    //     const user = {
    //     user_id: user_id,
    // };
  
    // sessionStorage.clear();
    // sessionStorage.setItem("user", JSON.stringify(user));
    window.location = "/feed"
  };


    return(
        <form onSubmit={onSubmit} className='form container form_profil' >
        <div className='form_title'>Modification du profil</div>

        <div className="avatarContainer"> 
          <img src={`http://localhost:4000${avatarProfil}`} alt="avatar de profil" />
          <input type="file"  onChange={handleChange} name="image" id="avatarProfil" />
          <label htmlFor="avatarProfil">
            <FontAwesomeIcon
              icon={faImage}
              className="avatarProfilChange"
            />
          </label>
        </div>
        <label htmlFor='firstname' className='form_label'>Prénom</label>
        <br />
        <input type='text' onChange={handleChange} name='firstname' id='firstname' value={firstname}  />
        {/* <div className='error'>{errors.firstname?.type === 'required' && "Vous devez entrer un prénom !"}</div>
        <div className='error'>{errors.firstname?.type === 'pattern' && "Ce champ ne peut pas comprendre de caractères spéciaux !"}</div>
        <br /> */}
        <br/>
        <label htmlFor='lastname'  className='form_label'>Nom</label>
        <br />
        <input type='text' onChange={handleChange} name='lastname' id='lastname' value={lastname} />
        {/* <div className='error'>{errors.lastname?.type === 'required' && "Vous devez entrer un nom !"}</div>
        <div className='error'>{errors.lastname?.type === 'pattern' && "Ce champ ne peut pas comprendre de caractères spéciaux !"}</div>
        <br /> */}
        <br/>
        <label htmlFor='service'  className='form_label'>Service</label>
        <br />
        <input type='text' onChange={handleChange} value={service} name='service' id='service'  />
        {/* <div className='error'>{errors.service?.type === 'required' && "Vous devez entrer votre service !"}</div>
        <div className='error'>{errors.service?.type === 'pattern' && "Ce champ ne peut pas comprendre de caractères spéciaux !"}</div>
        <br /> */}
        <br/>
        <label htmlFor='email' value={email} className='form_label'>Email</label>
        <br />
        <input type='email' onChange={handleChange}  name='email' id='email' value={email}  />
        {/* <div className='error'>{errors.email?.type === 'required' && "Vous devez entrer un email !"}</div>
        <div className='error'>{errors.email?.type === 'pattern' && "Veuillez entrer une email valide !"}</div>
        <br /> */}
        <br/>
        <input type='submit' value="modifier" className='btn' />
        
    </form>
    )

}

export default EditProfil;


