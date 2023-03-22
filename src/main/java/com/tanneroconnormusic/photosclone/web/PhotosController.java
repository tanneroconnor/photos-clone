package com.tanneroconnormusic.photosclone.web;

import com.tanneroconnormusic.photosclone.model.Photo;
import com.tanneroconnormusic.photosclone.service.PhotosService;
import jakarta.validation.Valid;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.server.UnsupportedMediaTypeStatusException;

import java.io.IOException;


@RestController
public class PhotosController {

    private final PhotosService photosService;
    private final ResourceLoader resourceLoader;

    public PhotosController(PhotosService photosService, ResourceLoader resourceLoader) {
        this.photosService = photosService;
        this.resourceLoader = resourceLoader;
    }

    @GetMapping("/")
    public ResponseEntity<Resource> getIndex() {
        Resource index = resourceLoader.getResource("classpath:/static/dist/index.html");
        return ResponseEntity.ok().contentType(MediaType.TEXT_HTML).body(index);
    }

    @GetMapping("/photos/{id}")
    public Photo getPhotos(@PathVariable Integer id) {
        Photo photo = photosService.get(id);
        if (photo == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        return photo;
    }

    // Sorts the photos by id since sortBy is not currently implemented in the API.
    // If the project were to scale and require more advanced sorting capabilities, Spring's
    // PagingAndSortingRepository interface could be utilized.
    @GetMapping("/photos")
    public Iterable<Photo> getAllPhotos() {
        Iterable<Photo> photos = photosService.getAllPhotosSortedByIdDesc();
        if (photos == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        return photos;
    }

    @DeleteMapping("/photos/{id}")
    public ResponseEntity<String> deletePhoto(@PathVariable Integer id) {
        photosService.remove(id);
        String message = "Photo deleted successfully";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_PLAIN);
        return new ResponseEntity<>(message, headers, HttpStatus.OK);
    }

    @PostMapping("/photos")
    public Photo createPhoto(@RequestPart("data") @Valid MultipartFile file) throws IOException {
        String fileType = file.getContentType();
        assert fileType != null;
        if (!fileType.equals("image/jpeg") && !fileType.equals("image/png")) {
            throw new UnsupportedMediaTypeStatusException("Only JPEG and PNG files are supported");
        }
        return photosService.save(file.getOriginalFilename(), file.getContentType(), file.getBytes());
    }

}
