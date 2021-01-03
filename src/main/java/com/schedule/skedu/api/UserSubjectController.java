package com.schedule.skedu.api;

import java.util.List;

import com.schedule.skedu.model.UserSubject;
import com.schedule.skedu.model.UserSubjectDetails;
import com.schedule.skedu.service.UserSubjectService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserSubjectController {
    @Autowired
    private UserSubjectService userSubjectService;

    @GetMapping("/users/{userId}/subjects")
    public List<UserSubjectDetails> getSubjectByUserId(@PathVariable Long userId) {
        return userSubjectService.getSubjects(userId);
    }

    @PostMapping("users/{userId}/subjects")
    public UserSubject addUserSubject(@PathVariable Long userId, @RequestBody UserSubject userSubject) {
        userSubject.setUserId(userId);
        return userSubjectService.addUserSubject(userSubject); 
    }
}