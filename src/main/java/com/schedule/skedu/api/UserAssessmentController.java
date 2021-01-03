package com.schedule.skedu.api;

import java.util.List;

import com.schedule.skedu.model.UserAssessment;
import com.schedule.skedu.service.UserAssessmentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserAssessmentController {
    @Autowired
    private UserAssessmentService userAssessmentService;

    @GetMapping("/users/{userId}/assessments")
    public List<UserAssessment> getUserAssessmentsByUserId(@PathVariable Long userId) {
        return userAssessmentService.getUserAssessments(userId);
    }

    @PostMapping("/users/{userId}/assessments")
    public UserAssessment addUserAssessmentByUserId(@PathVariable Long userId, @RequestBody UserAssessment userAssessment) {
        userAssessment.setUserId(userId);
        return userAssessmentService.addUserAssessment(userAssessment);
    }
}
