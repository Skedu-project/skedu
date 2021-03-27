package com.schedule.skedu.api;

import java.util.List;

import com.schedule.skedu.model.UserAssessment;
import com.schedule.skedu.service.UserAssessmentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @DeleteMapping("/assessments/{id}")
    public void deleteUserAssessment(@PathVariable Long id) {
        userAssessmentService.deleteUserAssessmentsById(id);
    }

    @PutMapping("/users/{id}/assessments")
    public boolean updateUserAssessmentIsComplete(@PathVariable Long id, @RequestParam boolean isComplete) {
        UserAssessment userAssessment = userAssessmentService.findUserAssessmentById(id).get();
        userAssessment.setIsComplete(isComplete);
        UserAssessment updatedUserAssessment = userAssessmentService.userIsComplete(userAssessment);
        return updatedUserAssessment.getIsComplete();
    }

    @PutMapping("/assessments/{id}")
    public UserAssessment updateSubjectDetails(@PathVariable Long id, @RequestBody UserAssessment userAssessment) {
        return userAssessmentService.updateAssessment(userAssessment);
    }
}
