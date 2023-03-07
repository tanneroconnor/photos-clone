import {showNotification, updateNotification} from "@mantine/notifications";
import {IconCheck, IconX} from "@tabler/icons-react";
import React from "react";

export function showUploadingPhotoNotification() {
    showNotification({
        id: 'uploading-photo',
        disallowClose: true,
        title: "Uploading Photo",
        message: "This may take a moment",
        className: 'my-notification-class',
        loading: true,
    });
}

export function showUploadPhotoFailureNotification() {
    updateNotification({
        id: 'uploading-photo',
        icon: <IconX size={18}/>,
        color: "red",
        title: "Failed to Upload",
        message: "Please try again later",
        disallowClose: false,
        loading: false
    })
}

export function showUploadPhotoSuccessNotification() {
    updateNotification({
        id: 'uploading-photo',
        disallowClose: false,
        message: "Successfully uploaded",
        loading: false,
        icon: <IconCheck size={18}/>,
        color: "green"
    });
}

export function showDeletingPhotoNotification() {
    showNotification({
        id: 'deleting-photo',
        disallowClose: true,
        title: "Deleting Photo",
        message: "This may take a moment",
        className: 'my-notification-class',
        loading: true,
        color: "blue"
    });
}

export function showDeletePhotoSuccessNotification() {
    updateNotification({
        id: 'deleting-photo',
        disallowClose: false,
        message: "Successfully Deleted",
        loading: false,
        icon: <IconCheck size={18}/>,
        color: "green"
    });
}

export function showDeletePhotoFailureNotification() {
    updateNotification({
        id: 'deleting-photo',
        icon: <IconX size={18}/>,
        color: "red",
        title: "Failed to Delete Photo",
        message: "Please try again later",
        disallowClose: false,
        loading: false
    });
}