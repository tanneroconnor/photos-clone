import {showUploadingPhotoNotification, showUploadPhotoFailureNotification} from './notifications.jsx'
import API_URLS from "./apiConfig.js";
import {saveAs} from 'file-saver';


export async function getAllPhotos() {
    try {
        const response = await fetch(`${API_URLS.photos}/all`, {
            method: "GET"
        });
        return handleError(response);
    }
    catch(error) {
        console.log(error);
    }
}

export async function uploadPhoto(file) {
    try {
        showUploadingPhotoNotification();
        const formData = new FormData();
        formData.append("data", file);
        const url = API_URLS.photos
        const response = await fetch(url, {
            method: "POST",
            body: formData
        })
        return handleError(response);
    } catch (error) {
        console.log(error);
        showUploadPhotoFailureNotification();
    }
}

export async function deletePhoto(id) {
    try {
        const url = `${API_URLS.photos}/${id}`;
        const response = await fetch(url, {
            method: "DELETE"
        });
        return handleError(response);
    } catch (error) {
        console.error('Error deleting photo:', error);
        return Promise.reject('Failed to delete photo');
    }
}

export async function downloadPhoto(id) {
    try {
        const response = await fetch(`http://localhost:8080/download/${id}`, {
            credentials: 'include'
        });

        if (!response.ok) {
            return new Error(`HTTP error: ${response.status} ${response.statusText}`);
        }

        const contentDisposition = response.headers.get('Content-Disposition');
        const match = /filename="(.*)"/.exec(contentDisposition);
        const filename = match ? match[1] : 'photo';
        const blob = await response.blob();
        saveAs(blob, filename);
    } catch (error) {
        console.log(error);
    }
}

async function handleError(response) {
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    }
    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
        return await response.json();
    } else {
        return await response.text();
    }
}


