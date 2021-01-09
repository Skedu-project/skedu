package com.schedule.skedu.api;

import java.util.List;

import com.schedule.skedu.model.AssessmentType;
import com.schedule.skedu.service.AssessmentTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AssessmentTypeController {
    @Autowired
    public AssessmentTypeService assessmentTypeService;

    @GetMapping("/assessments")
    public List<AssessmentType> getAssessmentTypes() {
        return assessmentTypeService.getAssessmentTypes();
    }
}
