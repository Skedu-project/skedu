package com.schedule.skedu.model;

public class UserSubjectFactor {
    private Long userSubjectId;
    private double subjectFactor;
    private double studyTime;
    private String subjectName;
    private String colorId;

    public Long getUserSubjectId() {
        return userSubjectId;
    }

    public String getColorId() {
        return colorId;
    }

    public void setColorId(String colorId) {
        this.colorId = colorId;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
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
