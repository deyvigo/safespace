package com.example.safespace_back.repository;

import com.example.safespace_back.model.DigitalResourcesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserFavoriteResourceRepository extends JpaRepository<DigitalResourcesEntity, Long> {

    @Query(value = """
        SELECT CASE WHEN COUNT(*) > 0 THEN TRUE ELSE FALSE END
        FROM user_favorite_digital_resources
        WHERE favorited_by_id = :userId
          AND favorite_resources_id = :resourceId
        """,
            nativeQuery = true)
    boolean existsFavorite(Long userId, Long resourceId);

}