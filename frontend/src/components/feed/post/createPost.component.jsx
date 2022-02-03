import { useForm } from 'react-hook-form';
import PostService from "../../../services/posts.service.js";
import FormData from 'form-data'
import React from "react";


function CreatePost() {

    //method to manage the rules of validations
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onTouched'
    }, {
        shouldFocusError:true
    });
    const { isSubmitting } = errors;

    const onSubmit = mydata => {

        let data = new FormData();
        data.append('image', mydata.mediaURL[0],mydata.mediaURL.name);
        data.append('title', mydata.title)
      
        PostService.CreatePost(data)
            .then(res => {
                window.location = '/feed';
            })
            .catch(err => { 
                return('error to create post!') });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='form container form_feed'>
            <div className='form_title'>Quoi de neuf aujourd'hui ?</div>

            <label htmlFor='title' className='form_label'>Titre du post</label>
            <br />
            <input type='text' name='title' id='title' placeholder='Titre' {...register('title', { required: true})} /> 
            <div className='error'>{errors.title?.type === 'required' && "Vous devez entrer un titre !"}</div>
            <br />
            <label htmlFor="mediaURL" className="form_label">Votre image</label>

            <input type='file'  name='image' id='mediaURL' {...register('mediaURL', { required: true})} />
            <div className='error'>{errors.title?.type === 'required' && "Vous choisir une image !"}</div>
            <input type='submit' disabled={isSubmitting}  value="Publier" className='btn btn_createPost' />
            
        </form>
    )
}


export default CreatePost;