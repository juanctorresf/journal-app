import { 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    updateProfile 
} from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try {
        const result = await signInWithPopup( FirebaseAuth, googleProvider );
        const { displayName, email, photoURL, uid } =  result.user;
        return {
            ok: true,
            //* User info
            displayName, email, photoURL, uid
        };

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return {
            ok: false,
            errorMessage,
        };
    };
};

export const registerUserWithEmailPassword = async( { email, password, displayName }) => {
    try {
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user;

        //* Update the displayName on Firebase
        await updateProfile( FirebaseAuth.currentUser, { displayName } );

        return {
            ok: true,
            uid, photoURL, email, displayName 
        };

    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message === 'Firebase: Error (auth/email-already-in-use).' ? 'Tu correo ya está en uso.' : 'Error en la autenticación',
        };
    };
};

export const loginWithEmailPassword = async({ email, password }) => {
    try {
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { displayName, uid, photoURL } = resp.user;
        
        return {
            ok: true,
            displayName, uid, photoURL,
        };

    } catch (error) {
        console.log( error.message );
        return {
            ok: false,
            errorMessage: error.message === 'Firebase: Error (auth/invalid-login-credentials).' ? 'Tu correo o contraseña son incorrectos.' : 'Error en la autenticación.',
        }
    };
};

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}