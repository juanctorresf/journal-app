
/**
 * The `fileUpload` function is an asynchronous function that uploads a file to a cloud storage service
 * using the Cloudinary API.
 * @param file - The `file` parameter is the file that you want to upload to the cloud. It should be a
 * valid file object that you can obtain from an input element of type "file" in HTML.
 * @returns the secure URL of the uploaded file.
 */

const cloudURL = import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_URL;

export const fileUpload = async( file ) => {
    if(!file) throw new Error("No tenemos ningún archivo a subir");

    const cloudUrl = cloudURL;

    const formData = new FormData();
    formData.append( 'upload_preset','react-journal' );
    formData.append( 'file', file );

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if( resp.ok ) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        } else {
            throw new Error('No se pudo subir imagen');
        }
    } catch(error) {
        console.log( error );
        throw new Error( error.message);
    }
}