package com.schedule.skedu.api;

import java.util.List;

import com.schedule.skedu.model.Subject;
import com.schedule.skedu.service.SubjectService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SubjectController {
  @Autowired
  private SubjectService subjectService; 

  @GetMapping("/subjects")
    public List<Subject> getSubjects() {
        return subjectService.getAllSubjects();
    }

}
