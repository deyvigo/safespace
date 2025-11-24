package com.example.safespace_back.service;

import com.example.safespace_back.model.DigitalResourcesEntity;
import com.example.safespace_back.model.ImageMetadataEntity;

public interface ImageMetadataService {

    ImageMetadataEntity uploadAndCreate(String base64, DigitalResourcesEntity parent);
    void deleteImage(String publicID);

}
