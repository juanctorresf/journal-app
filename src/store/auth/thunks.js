import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers"
import { clearNotesLogout } from "../journal";
import { checkingCredentials, login, logout } from "./authSlice"

/**
 * The function "checkingAuthentication" dispatches an action to check the user's credentials.
 * @param email - The email parameter is a string that represents the user's email address.
 * @param password - The password parameter is the password entered by the user for authentication.
 * @returns an async function that takes in a dispatch parameter.
 */
export const checkingAuthentication = ( email, password ) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() )
    };
};

/**
 * The function starts the Google Sign-In process and dispatches actions based on the result.
 * @returns The function `startGoogleSignIn` is returning a function that takes a `dispatch` parameter.
 */
export const startGoogleSignIn = () => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();
        if( !result.ok ) return dispatch( logout( result ) );

        dispatch( login( result ) );
    };
};

/**
 * This function starts the process of creating a user with an email, password, and display name by
 * dispatching actions to check the credentials, register the user, and login the user.
 * @returns a function that takes a dispatch parameter.
 */
export const startCreatingUserWithEmailPassword = ({ email, password, displayName}) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName});

        if ( !ok ) return dispatch( logout({ errorMessage }));
        
        dispatch( login({ uid, email, displayName, photoURL }) );
    };
};

/**
 * The function `startLoginWithEmailPassword` is an asynchronous action that dispatches actions to
 * check credentials, login, and logout based on the result of logging in with an email and password.
 * @returns a function that takes a dispatch parameter.
 */
export const startLoginWithEmailPassword = ({ email, password }) => {
    return async(dispatch) => {
        dispatch( checkingCredentials() );

        const { ok, uid, displayName, photoURL, errorMessage} = await loginWithEmailPassword({ email, password });

        if( !ok ) return dispatch( logout({errorMessage }) );

        dispatch( login({ uid, email, displayName, photoURL }));
    };
};

/**
 * The function `startLogout` is an asynchronous action that logs out the user from Firebase and
 * dispatches a `logout` action.
 * @returns The startLogout function is returning an async function that takes a dispatch parameter.
 */
export const startLogout = () => {
    return async(dispatch) => {
        await logoutFirebase();

        dispatch( clearNotesLogout() );
        dispatch( logout() );
    }
}