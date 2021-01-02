package com.schedule.skedu.model;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, String> {   //connecting repo to user class and the identifier is a long type.
    @Query(
        value = "SELECT * FROM subjects where id =:subjectId",
        nativeQuery = true
    )
    Optional<Subject> findSubjectById(@Param("subjectId") String subjectId); 
}
