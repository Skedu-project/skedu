package com.schedule.skedu.model;

import javax.persistence.Id;

public class UserAssignemnt {
    @Id
    private Long id;
    private String date;
    private String subjectName;
    private double totalPointsAvailable;
    private double priority;
}
