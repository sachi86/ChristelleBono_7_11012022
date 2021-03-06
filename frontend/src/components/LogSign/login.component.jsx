import { useForm } from 'react-hook-form';
import AuthService from "../../services/auth.service";
import Regex from "../../utils/regex.util";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onTouched'
    }, {
        shouldFocusError:true
    });
    const { isSubmitting } = errors;

    const onSubmit = data => {
        AuthService.login(
            data.email ,  data.password)
            .then(res => {

                window.location = '/feed';
            })
            .catch(err => { 'Error to login!' });
    }
    console.log(errors);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='form'>
            <div className='form_title'>Compte</div>
            <label htmlFor='email' className='form_label'>Email</label>
            <br />
            <input type='email' name='email' id='email' placeholder='jean.doe@mail.com' {...register('email', { required: true, pattern: Regex.regexEmail })} />
            <div className='error'>{errors.email?.type === 'required' && "Vous devez entrer une email !"}</div>
            <br />

            <label htmlFor='password' className='form_label'>Mot de passe</label>
            <br />
            <input type='password' name='password' id='password' placeholder='Mot de passe' {...register('password', { required: true, pattern: Regex.regexPassword })} />
            <div className='error'>{errors.password?.type === 'required' && "Vous devez entrer un mot de passe !"}</div>
            <div className='error error_password'>{errors.password?.type === 'pattern' && "Votre mot de passe doit contenir: 8 caractères minimum, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial !"}</div>
            <br />

            <input type='submit' disabled={isSubmitting} value="Se connecter" className='btn' />
        </form>
    );
};

export default Login;