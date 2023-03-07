package com.tanneroconnormusic.photosclone.repository;

import com.tanneroconnormusic.photosclone.model.Photo;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface PhotosRepository extends CrudRepository<Photo, Integer> {

    List<Photo> findAllByOrderByIdDesc();

}
