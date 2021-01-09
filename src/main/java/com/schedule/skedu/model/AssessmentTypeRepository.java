package com.schedule.skedu.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssessmentTypeRepository extends JpaRepository<AssessmentType, Long> {
    
}
