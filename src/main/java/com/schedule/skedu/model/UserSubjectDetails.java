package com.schedule.skedu.model;

import java.util.Optional;

public class UserSubjectDetails {

    private Long id;
    private Long userId;
    private Optional<Subject> subject;
    private int userGradeLevel;
    private double goalGrade;
    private String colorId;
    private Long totalPoints;
    private Long currentPoints;

    public Long getId() {
        return id;
    }

    public Long getCurrentPoints() {
        return currentPoints;
    }

    public void setCurrentPoints(Long currentPoints) {
        this.currentPoints = currentPoints;
    }

    public Long getTotalPoints() {
        return totalPoints;
    }

    public void setTotalPoints(Long totalPoints) {
        this.totalPoints = totalPoints;
    }

    public String getColorId() {
        return colorId;
    }

    public void setColorId(String colorId) {
        this.colorId = colorId;
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
