package com.schedule.skedu.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity // makes a table from the class
@Table(name = "User_Subjects") // names the table as user
public class UserSubject {
    @Id // says that it is the identifier so it has a unique value
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "subject_id")
    private String subjectId;

    private int userGradeLevel;
    private double goalGrade;

    private String colorId;

    public Long getId() {
        return id;
    }

    public String getColorId() {
        return colorId;
    }

    public void setColorId(String colorId) {
        this.colorId = colorId;
    }

    public String getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(String subjectId) {
        this.subjectId = subjectId;
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

}
