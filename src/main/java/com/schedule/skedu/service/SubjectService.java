package com.schedule.skedu.service;

import java.util.List;

import com.schedule.skedu.model.Subject;
import com.schedule.skedu.model.SubjectRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SubjectService {
  @Autowired
    private SubjectRepository subjectRepository; 
  
    public List<Subject> getAllSubjects() {
      return subjectRepository.findAll(); 
  }
}
