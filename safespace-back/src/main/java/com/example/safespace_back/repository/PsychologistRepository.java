package com.example.safespace_back.repository;

import com.example.safespace_back.model.PsychologistEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PsychologistRepository extends JpaRepository<PsychologistEntity, Long> {
    @Query("SELECT COUNT(s) FROM PsychologistEntity p LEFT jOIN p.students s GROUP BY p ORDER BY COUNT(s) ASC")
    List<Long> findStudentCountOrderedAsc(Pageable pageable);

    @Query("""
        SELECT p
        FROM PsychologistEntity p
        LEFT JOIN p.students s
        GROUP BY p
        HAVING COUNT(s) = :count
    """)
    List<PsychologistEntity> findAllByStudentCount(@Param("count") Long count);
}
