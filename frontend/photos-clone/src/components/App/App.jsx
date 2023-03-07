import '../../../App.css'
import AppHeader from "./AppHeader.jsx";
import PhotosContainer from "../Photos/PhotosContainer.jsx"
import {useEffect, useState} from "react";
import {
    showDeletingPhotoNotification,
    showDeletePhotoSuccessNotification,
    showUploadPhotoSuccessNotification,
    showDeletePhotoFailureNotification,
    showUploadPhotoFailureNotification,
    showUploadingPhotoNotification
} from "../../utils/notifications.jsx";
import {getAllPhotos, uploadPhoto, deletePhoto, downloadPhoto} from "../../utils/api.js";
export default function App(props) {

    const [photosData, setPhotosData] = useState([]);

    useEffect(() => {
        async function handleGetAllPhotos() {
            try {
                const data = await getAllPhotos();
                setPhotosData(data);
            } catch(error) {
                console.log(error);
            }
        }
        handleGetAllPhotos();
    }, []);

    async function handleDownloadPhoto(id) {
        await downloadPhoto(id)
    }

    async function handleUploadPhoto(file) {
        try {
            showUploadingPhotoNotification();
            const data = await uploadPhoto(file);
            setPhotosData(prevState => [data, ...prevState]);
            showUploadPhotoSuccessNotification();
        } catch (error) {
            showUploadPhotoFailureNotification();
            console.log(error);
        }
    }

    async function handleDeletePhoto(id) {
        try {
            showDeletingPhotoNotification();
            await deletePhoto(id);
            setPhotosData(prevState => prevState.filter(photo => photo.id !== id));
            showDeletePhotoSuccessNotification();
        } catch (error) {
            showDeletePhotoFailureNotification();
            console.log(error);
        }
    }

    return (
        <div>
            <AppHeader
                isDarkMode={props.isDarkMode}
                handleToggle={props.handleToggle}
                handleUploadPhoto={handleUploadPhoto}
            />
            <PhotosContainer
                isDarkMode={props.isDarkMode}
                photosData={photosData}
                handleDeletePhoto={handleDeletePhoto}
                handleDownloadPhoto={handleDownloadPhoto}
            />
        </div>
    )
}
