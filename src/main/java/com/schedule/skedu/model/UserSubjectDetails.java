package com.schedule.skedu.model;

import java.util.Optional;

public class UserSubjectDetails {

    private Long id;
    private Long userId;
    private Optional<Subject> subject;
    private int userGradeLevel;
    private double goalGrade;

    public Long getId() {
        return id;
    }

    public double getGoalGrade() {
        return goalGrade;
    }

    public void setGoalGrade(double goalGrade) {
        this.goalGrade = goalGrade;
    }

    public int getUserGradeLevel() {
        return userGradeLevel;
    }

    public void setUserGradeLevel(int userGradeLevel) {
        this.userGradeLevel = userGradeLevel;
    }

    public Optional<Subject> getSubject() {
        return subject;
    }

    public void setSubject(Optional<Subject> subjectInfo) {
        this.subject = subjectInfo;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setId(Long id) {
        this.id = id;
    }

    
}
