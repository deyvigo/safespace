package com.example.safespace_back.service.implement;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.safespace_back.service.CloudinaryService;
import com.example.safespace_back.dto.internal.CloudinaryUploadResult;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryServiceImp implements CloudinaryService {
    private final Cloudinary cloudinary;

    public CloudinaryServiceImp(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    @Override
    @SuppressWarnings("unchecked")
    public CloudinaryUploadResult uploadBase64(String base64Image) {
        try {
            Map<String, Object> uploadResult = (Map<String, Object>) cloudinary.uploader().upload(base64Image, ObjectUtils.emptyMap());
            String secureUrl = uploadResult.get("secure_url").toString();
            String publicId = uploadResult.get("public_id").toString();

            return new CloudinaryUploadResult(secureUrl, publicId);
        } catch (IOException e) {
            throw new RuntimeException("Error al subir la imagen a Cloudinary", e);
        }
    }

    @Override
    public void deleteImage(String publicId) {
        try {
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        } catch (IOException e) {
            throw new RuntimeException("Error eliminando imagen en Cloudinary", e);
        }
    }

}
