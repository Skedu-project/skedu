package com.schedule.skedu.api;

import java.util.List;

import com.schedule.skedu.model.SubjectColor;
import com.schedule.skedu.service.SubjectColorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SubjectColorController {
    @Autowired
    private SubjectColorService subjectColorService;

    @GetMapping("/subjectColors")
    public List<SubjectColor> getAllSubjectColors() {
        return subjectColorService.getAllSubjectColors();
    }
}
