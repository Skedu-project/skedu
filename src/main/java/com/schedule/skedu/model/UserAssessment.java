package com.schedule.skedu.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "User_Assessments")
public class UserAssessment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long userId;
    private Date date;
    private String subjectId;
    private String subjectName;
    private String assessmentTypeName;
    private double totalPointsAvailable;
    private double priority;

    public Long getId() {
        return id;
    }

    public String getAssessmentTypeName() {
        return assessmentTypeName;
    }

    public void setAssessmentTypeName(String assessmentTypeName) {
        this.assessmentTypeName = assessmentTypeName;
    }

    public double getPriority() {
        return priority;
    }

    public void setPriority(double priority) {
        this.priority = priority;
    }

    public double getTotalPointsAvailable() {
        return totalPointsAvailable;
    }

    public void setTotalPointsAvailable(double totalPointsAvailable) {
        this.totalPointsAvailable = totalPointsAvailable;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public String getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(String subjectId) {
        this.subjectId = subjectId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
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
