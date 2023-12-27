/*--------------------------------- IMPORTS ----------------------------*/
import { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
    removeErrorMessage, 
    startGoogleSignIn, 
    startLoginWithEmailPassword 
} from '../../store/auth';
import { useForm } from '../../hooks';

import { Button, Grid, Link, TextField, Typography, Alert } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';

const formData = {
    email: '',
    password: ''
}

export const LoginPage = () => {

    const { status, errorMessage } = useSelector( state => state.auth )
    const dispatch = useDispatch();

    const { email, password, onInputChange, formState } = useForm(formData);

    const isAuthenticating = useMemo( () => status === 'checking', [status]);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch( startLoginWithEmailPassword( formState ) );
    };

    const onGoogleSignIn = () => {
        dispatch( startGoogleSignIn() );
    };

    const onRemoveMessageError = () => {
        if( !!errorMessage ) return dispatch( removeErrorMessage() );
    };

    /*----------------------------- JSX ---------------------------------*/
    return (
        <AuthLayout title='Ingresar'>
            <form 
                onSubmit={ onSubmit } 
                className="animate__animated animate__fadeIn animate__faster"
            >
                <Grid container>
                    <Grid item xs={ 12 } sx={{ marginTop: 3, }}>    
                        <TextField 
                            label='Correo' 
                            type="email" 
                            placeholder="correo@mail.com"
                            name='email'
                            value= { email || '' }
                            onChange={ onInputChange }
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={ 12 } sx={{ marginTop: 2, }}>   
                        <TextField 
                            label='Contraseña' 
                            type="password" 
                            placeholder="Tu Contraseña"
                            autoComplete='false'
                            name='password'
                            value= { password || '' }
                            onChange={ onInputChange }
                            fullWidth
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

                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button 
                                disabled= { isAuthenticating }
                                type='submit' 
                                variant="contained" 
                                fullWidth    
                            >
                                Ingresar
                            </Button>
                        </Grid>

                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button 
                                disabled= { isAuthenticating }
                                variant="contained" 
                                fullWidth 
                                onClick={ onGoogleSignIn }
                            >
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction='row' justifyContent='end' >
                        <Link component={ RouterLink }  color='inherit' to='/auth/register' onClick={ onRemoveMessageError }>
                            Crea una cuenta
                        </Link>
                    </Grid>
                </Grid> {/*container*/}
            </form>
        </AuthLayout>
    )
}
