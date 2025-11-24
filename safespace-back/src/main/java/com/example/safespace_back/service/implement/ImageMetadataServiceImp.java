package com.example.safespace_back.service.implement;
import com.example.safespace_back.dto.internal.CloudinaryUploadResult;
import com.example.safespace_back.service.CloudinaryService;
import org.springframework.stereotype.Service;
import com.example.safespace_back.repository.ImageMetadataRepository;
import com.example.safespace_back.service.ImageMetadataService;
import com.example.safespace_back.model.ImageMetadataEntity;
import com.example.safespace_back.model.DigitalResourcesEntity;

@Service
public class ImageMetadataServiceImp implements ImageMetadataService {

    private final CloudinaryService cloudinaryService;
    private final ImageMetadataRepository imageMetadataRepository;

    public ImageMetadataServiceImp(CloudinaryService cloudinaryService,
                                   ImageMetadataRepository imageMetadataRepository) {
        this.cloudinaryService = cloudinaryService;
        this.imageMetadataRepository = imageMetadataRepository;
    }

    @Override
    public ImageMetadataEntity uploadAndCreate(String base64, DigitalResourcesEntity parent) {
        CloudinaryUploadResult result = cloudinaryService.uploadBase64(base64);

        ImageMetadataEntity image = new ImageMetadataEntity();
        image.setPublic_URL(result.secureUrl());
        image.setResourceParent(parent);
        image.setPublicID(result.publicId());
        return imageMetadataRepository.save(image);
    }

    @Override
    public void deleteImage(String publicID){
        cloudinaryService.deleteImage(publicID);
        imageMetadataRepository.deleteByPublicID(publicID);
    }

}
