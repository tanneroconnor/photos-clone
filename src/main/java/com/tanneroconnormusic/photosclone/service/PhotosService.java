package com.tanneroconnormusic.photosclone.service;

import com.tanneroconnormusic.photosclone.model.Photo;
import com.tanneroconnormusic.photosclone.repository.PhotosRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Service
public class PhotosService {

    private final PhotosRepository photosRepository;

    public PhotosService(PhotosRepository photosRepository) {
        this.photosRepository = photosRepository;
    }


    public Iterable<Photo> getAll() {
        return photosRepository.findAll();
    }

    public Iterable<Photo> getAllPhotosSortedByUploadDate() {
        return photosRepository.findAllByOrderByIdDesc();
    }

    public Photo get(Integer id) {
        return photosRepository.findById(id).orElse(null);
    }

    public void remove(Integer id) {
        photosRepository.deleteById(id);
    }

    public Photo save(String fileName, String contentType, byte[] data) {
        Photo photo = new Photo();
        photo.setFileName(fileName);
        photo.setRawData(data);
        photo.setContentType(contentType);
        photosRepository.save(photo);
        return photo;
    }
}
