package com.tanneroconnormusic.photosclone.model;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;


@Table("PHOTOS")
public class Photo {

    @Id
    private Integer id;

    @NotEmpty
    @Size(min=2, max=255)
    private String fileName;

    @NotEmpty
    @Size(min=2, max=255)
    private String contentType;

    @Size(max = 100000000, message = "Byte array is too large")
    private byte[] rawData;
    public Photo() {
    }

    public Photo(Integer id, String fileName) {
        this.id = id;
        this.fileName = fileName;
    }

    public byte[] getRawData() {
        return rawData;
    }

    public void setRawData(byte[] rawData) {
        this.rawData = rawData;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }


}
