package com.schedule.skedu.api;

import java.util.List;

import com.schedule.skedu.model.UserSubjectFactor;
import com.schedule.skedu.service.SubjectFactorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SubjectFactorController {
    @Autowired
    private SubjectFactorService subjectFactorService;

    @GetMapping("/users/{userId}/calculate")
    public List<UserSubjectFactor> calculateSubjectFactor(@PathVariable Long userId) {
        return subjectFactorService.calculateSubjectFactor(userId);
    }
}
