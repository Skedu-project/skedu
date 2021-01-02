package com.schedule.skedu.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Subjects")
public class Subject {

    @Id
    private String id;
    private String name;
    private int gradeLevel;

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id; 
    }

    public String getName() {
        return name;
    }

    public int getGradeLevel() {
        return gradeLevel;
    }

    public void setGradeLevel(int gradeLevel) {
        this.gradeLevel = gradeLevel;
    }

    public void setName(String name) {
        this.name = name;
    }
}
