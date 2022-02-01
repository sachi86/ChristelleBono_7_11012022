import { useForm } from 'react-hook-form';
import PostService from "../../../services/posts.service.js";
import ReactDOM from "react-dom";
import FormData from 'form-data'
import React from "react";


function CreatePost() {


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
        console.log("data",data);
      
        PostService.CreatePost(data)
            .then(res => {
                console.log(res.data);
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
            <label htmlFor="mediaURL" className="form_label"></label>

            <input type='file'  name='image' id='mediaURL' {...register('mediaURL', { required: true})} />
            <div className='error'>{errors.title?.type === 'required' && "Vous choisir une image !"}</div>
            <input type='submit' disabled={isSubmitting}  value="Publier" className='btn' />
            
        </form>
    )
}


export default CreatePost;