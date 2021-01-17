package com.schedule.skedu.model;

public class UserSubjectFactor {
    private Long userSubjectId;
    private double subjectFactor;
    private double studyTime;

    public Long getUserSubjectId() {
        return userSubjectId;
    }

    public double getStudyTime() {
        return studyTime;
    }

    public void setStudyTime(double studyTime) {
        this.studyTime = studyTime;
    }

    public double getSubjectFactor() {
        return subjectFactor;
    }

    public void setSubjectFactor(double subjectFactor) {
        this.subjectFactor = subjectFactor;
    }

    public void setUserSubjectId(Long userSubjectId) {
        this.userSubjectId = userSubjectId;
    }
}
