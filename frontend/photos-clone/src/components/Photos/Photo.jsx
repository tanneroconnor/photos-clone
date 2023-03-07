import React, {useState} from 'react';
import {ActionIcon} from "@mantine/core";
import {IconTrash, IconDownload} from "@tabler/icons-react";
import '../../../App.css'

export default function Photo(props) {

    const [photoOverlayIsShown, setPhotoOverlayIsShown] = useState(false);

    const photoContainerClassNames = "photo-container " +
        (photoOverlayIsShown ? "overlay" : "");

    return (
        <div
            className={photoContainerClassNames}
            onMouseEnter={() => setPhotoOverlayIsShown(true)}
            onMouseLeave={() => setPhotoOverlayIsShown(false)}
        >
            {photoOverlayIsShown &&
                <div className="icons-container">
                    <div className="icon top-right">
                        <ActionIcon
                            variant="filled"
                            onClick={() => props.handleDeletePhoto(props.id)}
                            color="red.8">
                            <IconTrash
                                className="photo-trash-icon"
                                size={16}/>
                        </ActionIcon>
                    </div>
                    <div className="icon top-left">
                        <ActionIcon
                            variant="filled"
                            onClick={() => props.handleDownloadPhoto(props.id)}
                            color="gray.8">
                            <IconDownload
                                className="photo-trash-icon"
                                size={16}/>
                        </ActionIcon>
                    </div>
                </div>
                }
            <img className="photo " src={props.src} alt={props.alt}/>
        </div>
    )
}