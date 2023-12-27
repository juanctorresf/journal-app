import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSave: [],
        notes: [],
        active: null,
    },
    reducers: {
        savingNewNote: (state, action) => {
            state.isSaving = action.payload;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
            state.messageSave = '';
        },
        setSaving: ( state ) => {
            state.isSaving = true;
            state.messageSave = '';
        },
        noteUpdated: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map( note => {
                if(note.id === action.payload.id) {
                    return action.payload 
                } else {
                    return note
                }
            })
            state.messageSave = `${action.payload.title}, actualizada correctamente.`;
        },
        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
            state.isSaving = false;
        },
        deleteNoteById: (state, action) => {
            state.active = null;
            state.notes = state.notes.filter( note => note.id !== action.payload );
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSave = '';
            state.notes = [];
            state.active = null;
        }
    }
});


// Action creators are generated for each case reducer function
export const { 
    addNewEmptyNote,
    clearNotesLogout,
    deleteNoteById, 
    noteUpdated,
    savingNewNote,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
} = journalSlice.actions;