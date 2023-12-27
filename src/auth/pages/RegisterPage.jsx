/*--------------------------------- IMPORTS ----------------------------*/
import { useState, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks';

import { Button, Grid, Link, TextField, Typography, Alert } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';

const formData = {
    email: '',
    password: '',
    displayName: '',
};

const formValidations = {
    email: [(value) => value.includes('@'), 'Correo debe tener una @.'],
    password: [(value) => value.length >= 6, 'La contraseña debe de tener más de 6 carácteres.'],
    displayName: [(value) => value.length >= 1, 'El nombre es obligatorio.'],
};

/*------------------------------- COMPONENT -----------------------------------*/
export const RegisterPage = () => {
    const dispatch = useDispatch();

    const [ formSubmitted, setFormSubmitted ] = useState(false);

    const { status, errorMessage } = useSelector( state => state.auth );
    const isCheckingAuthentication = useMemo( () => status === 'checking', [ status ]);
    
    const { 
        displayName, displayNameValid, 
        email, emailValid, 
        password, passwordValid,
        formState,  onInputChange, isFormValid
    } = useForm(formData, formValidations);
    
    const onSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        if ( !isFormValid ) return;

        dispatch( startCreatingUserWithEmailPassword(formState) );
    };

    /*----------------------------- JSX ---------------------------------*/
    return (
        <AuthLayout title='Registrate'>
            <form 
                onSubmit={ onSubmit }
                className="animate__animated animate__fadeIn animate__faster"
            >
                <Grid container>
                    <Grid item xs={ 12 } sx={{ marginTop: 3, }}>    
                        <TextField 
                            label='Nombre Completo' 
                            type="text" 
                            placeholder="Tu Nombre Completo"
                            name='displayName'
                            value={ displayName }
                            onChange={ onInputChange }
                            fullWidth
                            error = { !!displayNameValid && formSubmitted }
                            helperText= { formSubmitted && displayNameValid }                            
                        />
                    </Grid>

                    <Grid item xs={ 12 } sx={{ marginTop: 2, }}>    
                        <TextField 
                            label='Correo' 
                            type="email" 
                            placeholder="correo@mail.com"
                            name="email"
                            value={ email }
                            onChange={ onInputChange }
                            fullWidth
                            error = { !!emailValid && formSubmitted }
                            helperText= { formSubmitted && emailValid }
                        />
                    </Grid>

                    <Grid item xs={ 12 } sx={{ marginTop: 2, }}>   
                        <TextField 
                            label='Contraseña' 
                            type="password" 
                            placeholder="Contraseña"
                            autoComplete='false'
                            name="password"
                            value={ password }
                            onChange={ onInputChange }
                            fullWidth
                            error= { !!passwordValid && formSubmitted }
                            helperText= { formSubmitted && passwordValid }
                        />
                    </Grid>

                    <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1}} >
                        <Grid 
                            display={ !!errorMessage ? '' : 'none'}
                            item 
                            xs={ 12 } 
                            sm={ 12 }
                        >
                            <Alert severity='error'>{ errorMessage }</Alert>    
                        </Grid>

                        <Grid item xs={ 12 } sm={ 12 }>
                            <Button 
                                disabled={ isCheckingAuthentication }
                                variant="contained"
                                type="submit" 
                                fullWidth
                            >
                                Crear Cuenta
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction='row' justifyContent='end' >
                        <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
                        <Link component={ RouterLink }  color='inherit' to='/auth/login'>
                            Ingresar
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
