package com.schedule.skedu.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Subject_Colors")
public class SubjectColor {
    @Id
    private String id;
    private String displayName;

    public String getDisplayName() {
        return displayName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }
}
