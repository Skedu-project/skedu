package com.schedule.skedu.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.NaturalId;

@Entity // makes a table from the class
@Table(name = "User") // names the table as user
public class User {
    @Id // says that it is the identifier so it has a unique value
    @GeneratedValue(strategy = GenerationType.AUTO) // generates the value for the id
    private Long id;

    private String firstName;
    private String lastName;

    @NaturalId
    private String email;

    private String password;
    private boolean isSignedIn;
    private int totalTime;

    public String getFirstName() {
        return firstName;
    }

    public int getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(int totalTime) {
        this.totalTime = totalTime;
    }

    public boolean getIsSignedIn() {
        return isSignedIn;
    }

    public void setIsSignedIn(boolean isSignedIn) {
        this.isSignedIn = isSignedIn;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    @Override
	public String toString() {
		return "Student [id=" + id + ", name=" + firstName + " " + lastName + ", email=" + email + ", password=" + password + "]";
	}
}
