package com.schedule.skedu.service;

import java.util.List;

import com.schedule.skedu.model.SubjectColor;
import com.schedule.skedu.model.SubjectColorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SubjectColorService {
    @Autowired
    private SubjectColorRepository subjectColorRepository;

    public List<SubjectColor> getAllSubjectColors() {
        return subjectColorRepository.findAll();
    }
}
