import { useForm } from 'react-hook-form';
import AuthService from "../services/auth.service";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onTouched'
    }, {
        shouldFocusError:true
    });
    const { isSubmitting } = errors;

    const onSubmit = data => {
        AuthService.login(
            { email: data.email, password: data.password })
            .then(res => {
                console.log(res.data);
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
            <input type='email' name='email' id='email' placeholder='jean.doe@mail.com' {...register('email', { required: true, pattern: /^[\w_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}$/g })} />
            <div className='error'>{errors.email?.type === 'required' && "Vous devez entrer une adresse mail"}</div>
            <br />

            <label htmlFor='password' className='form_label'>Mot de passe</label>
            <br />
            <input type='password' name='password' id='password' placeholder='Mot de passe' {...register('password', { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ })} />
            <div className='error'>{errors.password?.type === 'required' && "Vous devez entrer un mot de passe"}</div>
            <div className='error'>{errors.password?.type === 'pattern' && "Votre mot de passe doit contenir: 8 caractères minimum, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial"}</div>
            <br />

            <input type='submit' disabled={isSubmitting} value="Se connecter" className='btn' />
        </form>
    );
};

export default Login;