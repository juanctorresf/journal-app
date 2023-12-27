import { useEffect, useMemo, useState } from "react";

export const useForm = ( initialForm = {}, formValidations = {} ) => {

    const [ formState, setFormState ] = useState( initialForm );
    const [ formValidation, setFormValidation ] = useState({});

    useEffect(() => {
        createValidation();
    }, [ formState ]);

    useEffect(() => {
        setFormState( initialForm );
    }, [initialForm]);
    
    const isFormValid = useMemo( () => {
        for (const formValue of Object.keys( formValidation ) ) {
            if( formValidation[formValue] !== null ) return false;
        }
        return true;

    }, [ formValidation ] ) 

    const onInputChange = ({ target }) => {
        const { name, value } = target;

        setFormState({
            ...formState,
            [name] : value,      
        });
    };

    const onResetForm = () => {
        setFormState(initialForm);
    };
    
    /**
     * The function `createValidation` checks the validity of form fields based on specified validations
     * and updates the form validation state accordingly.
     */
    const createValidation = () => {
        const formCheckedValues = {};

        for ( const formField of Object.keys( formValidations ) ) {
            const [ fn, errorMessage = 'Este campo no es válido.' ] = formValidations[formField];

            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }       
        setFormValidation( formCheckedValues );
    };

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid,
    }
};