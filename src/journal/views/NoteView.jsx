import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

import { ImageGallery } from "../components";
import { useForm } from "../../hooks/useForm";
import { noteUpdated, setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal";


export const NoteView = () => {
    const dispatch = useDispatch();
    const { active:note, messageSave, isSaving, notes } = useSelector( state => state.journal );

    const { body, title, date, onInputChange, formState } = useForm( note );

    const dateString = useMemo( () => {
        const newDate = new Date( date )
        return newDate.toUTCString();
    }, [date] );

    useEffect(() => {
        dispatch( setActiveNote(formState) );
    }, [formState]);

    useEffect(() => {
        if( messageSave.length > 0 ) {
            Swal.fire('Nota actualizada', messageSave, "success" )
        }
    }, [messageSave])
    
    const fileInputRef = useRef();
    
    const onSaveNote = () => {
        /* `dispatch( startSaveNote() );` is dispatching an action to start the process of saving the
        note. This action is responsible for initiating an asynchronous operation, such as making an
        API request to save the note data to a server. */
        dispatch( startSaveNote() );

        /* `dispatch( noteUpdated(formState) );` is dispatching an action to update the note in the
        Redux store. The `noteUpdated` action is responsible for updating the active note with the
        new form state. */
        dispatch( noteUpdated(formState) );
    };

    /**
     * The function `onFileInputChange` checks if any files are selected and dispatches an action to start
     * uploading the files.
     * @returns If `target.files` is equal to 0, then nothing is being returned. Otherwise, the
     * `startUploadingFiles` function is being dispatched with `target.files` as the argument.
     */
    const onFileInputChange = ({ target }) => {
        if( target.files === 0 ) return;

        dispatch( startUploadingFiles(target.files) );
    }

    const onDeleteNote = () => {
        Swal.fire({
            icon: "question",
            title: '¿Quires eliminar esta nota?',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Si",
            confirmButtonColor: "#ef5350"
        }).then( (result) => {
            if(result.isDismissed) return;
            else {
                dispatch( startDeletingNote() );
            }
        });
    }

    return (
        <Grid container direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={ 39 } fontWeight={'light'}>{ dateString }</Typography>
            </Grid>
            <Grid item>
                <input 
                    type="file" 
                    style={{ display: 'none'}}
                    ref={ fileInputRef }
                    multiple
                    onChange={ onFileInputChange }
                />

                <IconButton
                    color="primary"
                    onClick={ () => fileInputRef.current.click() }
                    disabled={ isSaving }
                >
                    <UploadOutlined />
                </IconButton>

                <Button
                    disabled={ isSaving }
                    onClick={ onSaveNote } 
                    color="primary" 
                    sx={{ p: 2 }}
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1}} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un título"
                    label="Título"
                    sx={{ border: 'none', mb: 1 }}
                    name="title"
                    value={ title }
                    onChange={ onInputChange }
                />

                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedió hoy?"
                    sx={{ border: 'none', mb: 1 }}
                    minRows={ 5 }
                    name="body" 
                    value={ body }
                    onChange={ onInputChange }
                />
            </Grid>

            <Grid container justifyContent="end">
                <Button
                    data-swal-template
                    onClick={ onDeleteNote }
                    sx={ {mt: 2} }
                    color="error"
                >
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>

            <ImageGallery images={ note.imageUrls } />
        </Grid>
    )
}
