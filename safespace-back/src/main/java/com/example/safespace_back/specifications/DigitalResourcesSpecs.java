package com.example.safespace_back.specifications;

import com.example.safespace_back.model.DigitalResourcesEntity;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

public class DigitalResourcesSpecs {
    public static Specification<DigitalResourcesEntity> fetchImages() {
        return (root, query, cb) -> {
            // Evita que Spring intente poner el fetch en el COUNT(*)
            assert query != null;
            if (query.getResultType() != Long.class) {
                root.fetch("images", JoinType.LEFT);
                query.distinct(true);
            }
            return null;
        };
    }

    public static Specification<DigitalResourcesEntity> hasPublished(Boolean published) {
        return (root, query, cb) ->
                published == null ? null : cb.equal(root.get("published"), published);
    }

    public static Specification<DigitalResourcesEntity> hasType(Long type) {
        return (root, query, cb) ->
                type == null ? null : cb.equal(root.get("type"), type);
    }

    public static Specification<DigitalResourcesEntity> hasCategory(Long category) {
        return (root, query, cb) ->
                category == null ? null : cb.equal(root.get("category"), category);
    }

    public static Specification<DigitalResourcesEntity> hasOwner(Long ownerId) {
        return (root, query, cb) ->
                ownerId == null ? null :
                        cb.equal(root.get("psychologist").get("id"), ownerId);
    }

    public static Specification<DigitalResourcesEntity> isNotOwner(Long ownerId) {
        return (root, query, cb) ->
                ownerId == null ? null :
                        cb.notEqual(root.get("psychologist").get("id"), ownerId);
    }

}
