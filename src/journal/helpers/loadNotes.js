import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";

/**
 * The function `loadNotes` loads notes from a Firestore collection based on a user's UID.
 * @param [uid] - The `uid` parameter is the unique identifier of the user. It is used to specify the
 * user for whom the notes are being loaded.
 * @returns an array of notes. Each note object in the array has an "id" property which represents the
 * document ID in the Firestore collection, and the rest of the properties are the data stored in the
 * document.
 */
export const loadNotes = async ( uid = '') => {
    if( !uid ) throw new Error('El uid del usuario no existe');

    const collectionRef = collection( FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);

    const notes = []
    docs.forEach( doc => {
        notes.push({ id: doc.id, ...doc.data() })
    })
    return notes;
}