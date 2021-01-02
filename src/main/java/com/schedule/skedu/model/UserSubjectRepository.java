package com.schedule.skedu.model;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSubjectRepository extends JpaRepository<UserSubject, Long> {   //connecting repo to user class and the identifier is a long type.
    @Query(
        value = "SELECT * FROM user_subjects where user_id =:userId",
        nativeQuery = true
    )
    List<UserSubject> findSubjectsByUserId(@Param("userId") Long userId);  
}