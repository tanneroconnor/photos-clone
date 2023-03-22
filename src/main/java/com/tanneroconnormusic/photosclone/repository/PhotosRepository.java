package com.tanneroconnormusic.photosclone.repository;

import com.tanneroconnormusic.photosclone.model.Photo;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface PhotosRepository extends CrudRepository<Photo, Integer> {

    List<Photo> findAllByOrderByIdDesc();

}
