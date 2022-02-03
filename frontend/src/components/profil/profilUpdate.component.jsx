import React, {  useEffect, useState} from "react";
import { Formik, Field, Form } from 'formik';
import UserService from '../../services/user.service';
import ButtonReturnFeed from "./buttonReturnFeed";

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
        await UserService.updateProfil(firstname,lastname,service,email);
  };

    return (
      <Formik
        initialValues={{
              firstname: '',
              lastname: '',
              service: '',
              email: ''
            }}
            >
            {(formik) => {
              return (

              <Form onSubmit={onSubmit} className='form container form_profil' >
              <ButtonReturnFeed/>
              <div className='form_title'>Modification du profil</div>

              <label htmlFor='firstname' className='form_label'>Prénom</label>
              <br />
              <Field name="firstname" type="text" onChange={handleChangeFirstname} className="contact-form__text-input" value={firstname}/>
              <br/>
              <label htmlFor='lastname'  className='form_label'>Nom</label>
              <br />
              <Field name="lastname" type="text" onChange={handleChangeLastname} className="contact-form__text-input" value={lastname}/>
              <br/>
              <label htmlFor='service'  className='form_label'>Service</label>
              <br />
              <Field name="service" type="text" onChange={handleChangeService} className="contact-form__text-input" value={service}/>
        
              <br/>
              <label htmlFor='email' value={email} className='form_label'>Email</label>
              <br />
              <Field name="email" type="text" onChange={handleChangeEmail} className="contact-form__text-input" value={email}/>
              <br/>
              <input type='submit' value="modifier" className='btn' />
        
            </Form>
            );
          }}
      </Formik>
    )

}

export default EditProfil;


