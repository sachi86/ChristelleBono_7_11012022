import { useForm } from 'react-hook-form';
import AuthService from "../../services/auth.service";
import Regex from "../../utils/regex.util";


function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onTouched'
    }, {
        shouldFocusError:true
    });
    const { isSubmitting } = errors;

    const onSubmit = data => {
        console.log("hello world!")
        AuthService.signup(
            { firstname: data.firstname, lastname: data.lastname, service: data.service, email: data.email, password: data.password })
            .then(res => {
                console.log("hello sign up!");
                console.log(res.data);
                window.location = '/feed';
            })
            .catch(err => { 'error to sign up!' });
    }
    console.log(errors);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='form'>
            <div className='form_title'>Inscription</div>

            <label htmlFor='firstname' className='form_label'>Prénom</label>
            <br />
            <input type='text' name='firstname' id='firstname' placeholder='Jean' {...register('firstname', { required: true,  pattern:  Regex.regexText})} />
            <div className='error'>{errors.firstname?.type === 'required' && "Vous devez entrer un prénom !"}</div>
            <div className='error'>{errors.firstname?.type === 'pattern' && "Ce champ ne peut pas comprendre de caractères spéciaux !"}</div>
            <br />

            <label htmlFor='lastname' className='form_label'>Nom</label>
            <br />
            <input type='text' name='lastname' id='lastname' placeholder='Doe' {...register('lastname', { required: true,  pattern: Regex.regexText })} />
            <div className='error'>{errors.lastname?.type === 'required' && "Vous devez entrer un nom !"}</div>
            <div className='error'>{errors.lastname?.type === 'pattern' && "Ce champ ne peut pas comprendre de caractères spéciaux !"}</div>
            <br />

            <label htmlFor='service' className='form_label'>Service</label>
            <br />
            <input type='text' name='service' id='service' placeholder='Ressources humaines' {...register('service', { required: true,  pattern: Regex.regexText})} />
            <div className='error'>{errors.service?.type === 'required' && "Vous devez entrer votre service !"}</div>
            <div className='error'>{errors.service?.type === 'pattern' && "Ce champ ne peut pas comprendre de caractères spéciaux !"}</div>
            <br />

            <label htmlFor='email' className='form_label'>Email</label>
            <br />
            <input type='email' name='email' id='email' placeholder='jean.doe@mail.com' {...register('email', { required: true, pattern: Regex.regexEmail })} />
            <div className='error'>{errors.email?.type === 'required' && "Vous devez entrer un email !"}</div>
            <div className='error'>{errors.email?.type === 'pattern' && "Veuillez entrer une email valide !"}</div>
            <br />

            <label htmlFor='password' className='form_label'>Mot de passe</label>
            <br />
            <input type='password' name='password' id='password' placeholder='Mot de passe' {...register('password', { required: true, pattern: Regex.regexPassword})} />
            <div className='error'>{errors.password?.type === 'required' && "Vous devez entrer un mot de passe !"}</div>
            <div className='error'>{errors.password?.type === 'pattern' && "Votre mot de passe doit contenir: 8 caractères minimum, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial !"}</div>
            <br />

            <input type='submit' disabled={isSubmitting} value="S'inscrire" className='btn' />
        </form>
    )
}



export default SignUp;