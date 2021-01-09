package com.schedule.skedu.service;

import java.util.List;

import com.schedule.skedu.model.AssessmentType;
import com.schedule.skedu.model.AssessmentTypeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AssessmentTypeService {
    @Autowired
    public AssessmentTypeRepository assessmentTypeRepository;

    public List<AssessmentType> getAssessmentTypes() {
        return assessmentTypeRepository.findAll();
    }
}
