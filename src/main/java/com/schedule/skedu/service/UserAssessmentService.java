package com.schedule.skedu.service;

import java.util.List;

import com.schedule.skedu.model.UserAssessment;
import com.schedule.skedu.model.UserAssessmentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserAssessmentService {
    @Autowired
    private UserAssessmentRepository userAssessmentRepository;

    public List<UserAssessment> getUserAssessments(Long userId) {
        return userAssessmentRepository.findAllByUserId(userId);
    }

    public UserAssessment addUserAssessment(UserAssessment userAssessment) {
        return userAssessmentRepository.save(userAssessment);
    }
}
