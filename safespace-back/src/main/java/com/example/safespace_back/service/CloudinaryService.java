package com.example.safespace_back.service;

import com.example.safespace_back.dto.internal.CloudinaryUploadResult;

import java.io.IOException;

public interface CloudinaryService {
    CloudinaryUploadResult uploadBase64(String base64Image) ;
    void deleteImage(String publicId);
}
