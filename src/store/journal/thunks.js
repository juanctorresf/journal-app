import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { 
    addNewEmptyNote, 
    deleteNoteById, 
    noteUpdated, 
    savingNewNote, 
    setActiveNote, 
    setNotes, 
    setPhotosToActiveNote, 
    setSaving 
} from "./journalSlice";
import { fileUpload, loadNotes } from "../../journal/helpers";

/**
 * The `startNewNote` function creates a new note with an empty title and body, saves it to the
 * Firebase database, and dispatches actions to add the new note to the state and set it as the active
 * note.
 * @returns a function that is using the async/await syntax.
 */
export const startNewNote = () => {
    return async( dispatch, getState ) => {
        //uid
        dispatch( savingNewNote(true) )
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes` ) ); 
        await setDoc( newDoc, newNote );

        newNote.id = newDoc.id;

        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote) );
    }
}

/**
 * The function `startLoadingNotes` is an asynchronous action that loads notes for a specific user and
 * dispatches an action to set the loaded notes.
 * @returns The function `startLoadingNotes` is returning an asynchronous function.
 */
export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        if( !uid ) throw new Error('El uid del usuario no existe');

        const notes = await loadNotes( uid );

        dispatch( setNotes( notes ) );
    }
}

/**
 * The `startSaveNote` function is an asynchronous action that saves a note to Firestore and updates
 * the note in the Redux store.
 * @returns The `startSaveNote` function returns an asynchronous function.
 */
export const startSaveNote = () => {
    return async( dispatch, getState ) => {
        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc( docRef, noteToFireStore, { merge: true });

        dispatch( noteUpdated(note) )
    }
}

/**
 * The function `startUploadingFiles` uploads multiple files asynchronously and dispatches an action
 * with the URLs of the uploaded photos.
 * @param [files] - An array of files that need to be uploaded.
 * @returns an async function that takes a dispatch parameter.
 */
export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch ) => {
        dispatch( setSaving() );

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ) );
        };

        const photosUrls = await Promise.all( fileUploadPromises );
        
        // photosUrls
        dispatch( setPhotosToActiveNote( photosUrls ) );
    }
}

/**
 * The `startDeletingNote` function deletes a note from the journal by dispatching an action to delete
 * the note by its ID.
 * @returns The `startDeletingNote` function returns an asynchronous function.
 */
export const startDeletingNote = () => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc( docRef );

        dispatch( deleteNoteById( note.id ) );
    }
}