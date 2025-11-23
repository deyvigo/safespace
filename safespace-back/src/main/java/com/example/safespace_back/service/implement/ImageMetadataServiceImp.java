package com.example.safespace_back.service.implement;
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
        String publicUrl = cloudinaryService.uploadBase64(base64);
        System.out.println("Imagen guardada");
        System.out.println(publicUrl);
        ImageMetadataEntity image = new ImageMetadataEntity();
        image.setPublic_URL(publicUrl);
        image.setResourceParent(parent);

        return imageMetadataRepository.save(image);
    }

}
