import React, {  useEffect, useState} from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
// import Regex from '../../utils/regex.util';
import UserService from '../../services/user.service';

const SignInSchema = Yup.object().shape({
/*   firstname: Yup.string().required("Can't be empty"),
  lastname: Yup.string().required("Can't be empty"),
  service: Yup.string().required("Can't be empty"),
  email: Yup.string().required("Can't be empty").matches(
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          "Please use a valid email address"
        ), */

});



const EditProfil = () => {


    
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [service, setService] = useState("");
    const [email, setEmail] = useState("");

    
     const handleChangeFirstname = (event) => {
        setFirstname(event.target.value);
       
    } 
    const handleChangeLastname = (event) => {
      setLastname(event.target.value);
     
  } 
  const handleChangeService = (event) => {
    setService(event.target.value);
   
} 
const handleChangeEmail = (event) => {
  setEmail(event.target.value);
 
} 

    useEffect(() => {
        UserService.getOneProfil()
        
        .then((res) =>{
            console.log(res.data);
            setFirstname(res.data.firstname);
            setLastname(res.data.lastname);
            setService(res.data.service);
            setEmail(res.data.email);
        })
    }, []);

    
      const onSubmit = async (e) => {
        e.preventDefault();
    

        // newProfil.append("avatarProfil", document.getElementById("avatarProfil").files[0])
    
        await UserService.updateProfil(firstname,lastname,service,email);

    //     const user_id = JSON.parse(sessionStorage.getItem("user")).user_id;
    //     const user = {
    //     user_id: user_id,
    // };
  
    // sessionStorage.clear();
    // sessionStorage.setItem("user", JSON.stringify(user));
  };


  
    return (
      <Formik
        initialValues={{
              firstname: '',
              lastname: '',
              service: '',
              email: ''
          }}
          validationSchema={SignInSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
         >
         {(formik) => {
          const { errors, touched } = formik;
          return (

        <Form onSubmit={onSubmit} className='form container form_profil' >
        <div className='form_title'>Modification du profil</div>

        {/* <div className="avatarContainer"> 
          <img src={`http://localhost:4000${avatarProfil}`} alt="avatar de profil" />
          <input type="file"  onChange={handleChange} name="image" id="avatarProfil" />
          <label htmlFor="avatarProfil">
            <FontAwesomeIcon
              icon={faImage}
              className="avatarProfilChange"
            />
          </label>
        </div> */}
        <label htmlFor='firstname' className='form_label'>Prénom</label>
        <br />
        <Field name="firstname" type="text" onChange={handleChangeFirstname} className="contact-form__text-input" value={firstname}/>
              <div className="contact-form__error">
              {errors.firstname && touched.firstname ? <ErrorMessage name="firstname" component="span" className="contact-form__error__msg"/> : null}

              </div>

        {/* <input type='text' onChange={handleChangeFirstname} name='firstname' id='firstname' value={firstname}  /> */}
        {/* <div className='error'>{errors.firstname?.type === 'required' && "Vous devez entrer un prénom !"}</div>
        <div className='error'>{errors.firstname?.type === 'pattern' && "Ce champ ne peut pas comprendre de caractères spéciaux !"}</div>
        <br /> */}
        <br/>
        <label htmlFor='lastname'  className='form_label'>Nom</label>
        <br />
        <Field name="lastname" type="text" onChange={handleChangeLastname} className="contact-form__text-input" value={lastname}/>
              <div className="contact-form__error">
                <ErrorMessage name="lastname" component="span"  className="contact-form__error__msg"/>
              </div>
        {/* <input type='text' onChange={handleChangeLastname} name='lastname' id='lastname' value={lastname} /> */}
        {/* <div className='error'>{errors.lastname?.type === 'required' && "Vous devez entrer un nom !"}</div>
        <div className='error'>{errors.lastname?.type === 'pattern' && "Ce champ ne peut pas comprendre de caractères spéciaux !"}</div>
        <br /> */}
        <br/>
        <label htmlFor='service'  className='form_label'>Service</label>

        <br />
        <Field name="service" type="text" onChange={handleChangeService} className="contact-form__text-input" value={service}/>
              <div className="contact-form__error">
                <ErrorMessage name="service" component="span"  className="contact-form__error__msg"/>
                {errors.service && touched.service ? <span className="contact-form__error__icon"></span> : null}
              </div>
        {/* <input type='text' onChange={handleChangeService} value={service} name='service' id='service'  /> */}
        {/* <div className='error'>{errors.service?.type === 'required' && "Vous devez entrer votre service !"}</div>
        <div className='error'>{errors.service?.type === 'pattern' && "Ce champ ne peut pas comprendre de caractères spéciaux !"}</div>
        <br /> */}
        <br/>
        <label htmlFor='email' value={email} className='form_label'>Email</label>
        <br />
        <Field name="email" type="text" onChange={handleChangeEmail} className="contact-form__text-input" value={email}/>
              <div className="contact-form__error">
                <ErrorMessage name="email" component="span"  className="contact-form__error__msg"/>
                {errors.email && touched.email ? <span className="contact-form__error__icon"></span> : null}
              </div>
        {/* <input type='email' onChange={handleChangeEmail}  name='email' id='email' value={email}  /> */}
        {/* <div className='error'>{errors.email?.type === 'required' && "Vous devez entrer un email !"}</div>
        <div className='error'>{errors.email?.type === 'pattern' && "Veuillez entrer une email valide !"}</div>
        <br /> */}
        <br/>
        <input type='submit' value="modifier" className='btn' />
        
    </Form>
    );
      }}
      </Formik>
    )

}

export default EditProfil;


