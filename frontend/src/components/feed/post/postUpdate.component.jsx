/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, {  useEffect, useState, useForm} from "react";
import { authHeaderShort } from "../../../services/auth-header";
import axios from 'axios';
const ApiKeyPost = process.env.REACT_APP_API_URL + "/api/posts/"

const EditProfil = ({postId}) => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onTouched'
  }, {
    shouldFocusError:true
  });

  const { isSubmitting } = errors;
    
    const [title, setTitle] = useState("");
    const [mediaURL, setMediaURL] = useState(null);

    
     const handleChangeTitle = (event) => {
        setTitle(event.target.value);
       
    } 

    useEffect(() => {
      axios.get(ApiKeyPost + postId ,  
        { headers: {Authorization: authHeaderShort(),
          'Content-Type': 'multipart/form-data'} } )
        
        .then((res) =>{
            console.log(res.data);
            setTitle(res.data.firstname);
            setMediaURL(res.data.mediaURL);

        })
    }, []);

    
      const onSubmit = async (e) => {
        e.preventDefault();  
        await axios.post(ApiKeyPost + postId ,  
          { headers: {Authorization: authHeaderShort(),
            'Content-Type': 'multipart/form-data'} } )
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form container form_feed'>
        <div className='form_title'>Quoi de neuf aujourd'hui ?</div>

        <label htmlFor='title' className='form_label'>Titre du post</label>
        <br />
        <input type='text' name='title' id='title' onChange={handleChangeTitle} value={title} {...register('title', { required: true})} />
        <div className='error'>{errors.title?.type === 'required' && "Vous devez entrer un titre !"}</div>
        <br />
        <img src={mediaURL}/>
        <input type='submit' disabled={isSubmitting}  value="Publier" className='btn btn_createPost' /> 
    </form>
)
}

export default EditProfil;


