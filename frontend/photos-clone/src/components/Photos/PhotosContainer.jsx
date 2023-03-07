import React from 'react'
import '../../../App.css'
import {Text, Title} from '@mantine/core'
import Photo from "./Photo.jsx";

export default function PhotosContainer(props) {

    const photos = props.photosData.map(photo => {
        let source = "data:image/png;base64," + photo.rawData;
        return <Photo key={photo.id}
                      id={photo.id}
                      src={source} alt=""
                      handleDeletePhoto={props.handleDeletePhoto}
                      handleDownloadPhoto={props.handleDownloadPhoto}/>
    })

    // We're using dummyPhotos to adjust the spacing of the last row of photos when there are only a few photos in that row.
    // This is necessary because we're using justify-content to space the <Photo /> components.
    // If you know a better solution, please feel free to implement it.
    const dummyPhotos = [];
    function createDummyPhotos() {
        for(let i = 0; i < 6 - (props.photosData.length % 6); i++) {
            dummyPhotos.push(<div key={i + 1000} className="dummy-photo"></div>)
        }
    }
    createDummyPhotos();

    const photosMainStyles = {
        backgroundColor: props.isDarkMode ? "#2b2b2c" : "#F1F3F5",
        color: props.isDarkMode ? "white" : "black"
    }

    return (
        <div className="photos-container" style={photosMainStyles}>
            <div>
                { photos.length <= 0 ?
                    <div className="no-photos-message">
                        <Title size="h2" ta="center">No Photos Uploaded</Title>
                        <Text color="dimmed" ta="center">Try importing a photo!</Text>
                    </div>
                    :
                    <div className="photos-wrapper">
                        {photos}
                        {dummyPhotos}
                    </div>
                }
            </div>
        </div>
    )
}
