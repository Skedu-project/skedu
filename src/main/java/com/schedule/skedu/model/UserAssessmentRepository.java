package com.schedule.skedu.model;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAssessmentRepository extends JpaRepository<UserAssessment, Long> {
    List<UserAssessment> findAllByUserId(Long userId);
}
