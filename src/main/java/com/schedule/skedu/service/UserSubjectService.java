package com.schedule.skedu.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.schedule.skedu.model.Subject;
import com.schedule.skedu.model.SubjectRepository;
import com.schedule.skedu.model.UserSubject;
import com.schedule.skedu.model.UserSubjectDetails;
import com.schedule.skedu.model.UserSubjectRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserSubjectService {
    @Autowired
    private UserSubjectRepository userSubjectRepository;
    @Autowired
    private SubjectRepository subjectRepository; 

    public List<UserSubjectDetails> getSubjects(Long userId){
        List<UserSubject> userSubjects = userSubjectRepository.findSubjectsByUserId(userId);
        List<UserSubjectDetails> userSubjectDetails = new ArrayList<>();

        for (int i = 0; i < userSubjects.size(); i++) {
            UserSubject userSubject = userSubjects.get(i); 
            String subjectId = userSubject.getSubjectId(); 
            Optional<Subject> subjectInfo = subjectRepository.findSubjectById(subjectId);
            UserSubjectDetails userSubjectDetail = buildUserSubjectInfo(userSubject, subjectInfo);
            userSubjectDetails.add(userSubjectDetail);
        }
        
        return userSubjectDetails; 
    }

    public UserSubject addUserSubject(UserSubject userSubject){
        return userSubjectRepository.save(userSubject);
    }
    
    private UserSubjectDetails buildUserSubjectInfo(UserSubject userSubject, Optional<Subject> subjectInfo) {
        UserSubjectDetails userSubjectDetail = new UserSubjectDetails();
        userSubjectDetail.setId(userSubject.getId());
        userSubjectDetail.setUserId(userSubject.getUserId());
        userSubjectDetail.setSubject(subjectInfo);
        userSubjectDetail.setUserGradeLevel(userSubject.getUserGradeLevel());
        userSubjectDetail.setGoalGrade(userSubject.getGoalGrade());
        userSubjectDetail.setColorId(userSubject.getColorId());
        userSubjectDetail.setCurrentPoints(userSubject.getCurrentPoints());
        userSubjectDetail.setTotalPoints(userSubject.getTotalPoints());
        return userSubjectDetail;
    }

    public Optional<UserSubject> getUserSubjectId(Long userId, String subjectName) {
        Subject subject = subjectRepository.findByName(subjectName);
        String subjectId = subject.getId();
        return userSubjectRepository.findBySubjectIdAndUserId(subjectId, userId);
    } 

    public Optional<UserSubject> getSubjectById(Long id) {
        return userSubjectRepository.findById(id);
    }
}
