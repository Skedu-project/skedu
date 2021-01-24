package com.schedule.skedu.service;

import java.text.DateFormat;
import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.schedule.skedu.model.User;
import com.schedule.skedu.model.UserAssessment;
import com.schedule.skedu.model.UserSubjectDetails;
import com.schedule.skedu.model.UserSubjectFactor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class SubjectFactorService {
    @Autowired
    private UserAssessmentService userAssessmentService;
    @Autowired
    private UserSubjectService userSubjectService;
    @Autowired
    private UserService userService;

    List<UserAssessment> userAssessments;
    List<UserSubjectDetails> userSubjects;
    Optional<User> user;

    @Value("${assessmentDate.factor}")
    private double assessmentDateFactor;
    @Value("${assessmentPercent.factor}")
    private double assessmentPercentFactor;
    @Value("${assessmentPriority.factor}")
    private double assessmentPriorityFactor;
    @Value("${assessment.factor}")
    private double assessmentFactor;
    @Value("${goal.factor}")
    private double goalFactor;
    @Value("${mp.factor}")
    private double mpFactor;
    @Value("${daysForMP.factor}")
    private double daysForMPFactor;
    @Value("${daysForAssessment.factor}")
    private double daysForAssessmentFactor;

    public void getInfo(Long userId) {
        userAssessments = userAssessmentService.getUserAssessments(userId);
        userSubjects = userSubjectService.getSubjects(userId);
        user = userService.getUser(userId);
    }

    public double calculatePercentTotalPoints(double totalPoints, double pointsAvailableInAssessment) {
        totalPoints = totalPoints + pointsAvailableInAssessment;
        if(totalPoints < 50) {
            totalPoints = 50;
        }
        return pointsAvailableInAssessment/totalPoints;
    }

    public double calculateDaysLeftForAssessment(Date assessmentDate) {
        LocalDate currentDate = LocalDate.now();
        LocalDate formattedAssessmentDate = assessmentDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        double diff = (Period.between(currentDate, formattedAssessmentDate).getDays())+1;
        double returnVal;
       // System.out.println("Diff: " + diff);
        if (diff < daysForAssessmentFactor) {
            returnVal = ((daysForAssessmentFactor+1)-diff)/daysForAssessmentFactor;
           // System.out.println("In loop and value is " + returnVal);
        }
        else {
            returnVal = 0.0;
        }
        return returnVal;
    }

    public double calculateDaysLeftForMP(Date mpEndDate) {
        LocalDate currentDate = LocalDate.now();
        LocalDate formattedMPEndDate = mpEndDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        double diff = (Period.between(currentDate, formattedMPEndDate).getDays())+1;
        double returnVal;
        if(diff < daysForMPFactor) {
            returnVal = ((daysForMPFactor+1)-diff)/daysForMPFactor;
        } else {
            returnVal = 0.0;
        }
        return returnVal;
    }

    public double calculateDifferenceFromGoal(double goalGrade, double totalPoints, double currentPoints) {
        if(totalPoints == 0.0) {
            totalPoints = 1.0;
        }
        double actualGrade = currentPoints/totalPoints;
        double diff = 5*((goalGrade/100)-actualGrade);
        if(diff > 1) {
            diff = 1;
        } else if(diff < 0) {
            diff = 0;
        }
        //System.out.println("diff: " + diff);
        return diff;
    }

    public List<UserSubjectFactor> calculateSubjectFactor(Long userId) {
        getInfo(userId);
        List<UserSubjectFactor> userSubjectFactors = new ArrayList<>();
        List<Double> subjectFactors = new ArrayList<>();
        for(int i=0; i<userSubjects.size(); i++) {
            UserSubjectFactor userSubjectFactor = new UserSubjectFactor();

            Long userSubjectId = userSubjects.get(i).getId();
            double subjectAssessmentFactor = 0.0;
            for(int j=0; j<userAssessments.size(); j++) {
                if(userAssessments.get(j).getUserSubjectId() == userSubjectId  && userAssessments.get(j).getIsComplete() == false) {
                    //assessment logic
                    double daysLeftForAssessment = assessmentDateFactor*(calculateDaysLeftForAssessment(userAssessments.get(j).getDate()));
                   // System.out.println("Days: " + daysLeftForAssessment);
                    double percentTotalPoints = assessmentPercentFactor*(calculatePercentTotalPoints(userSubjects.get(i).getTotalPoints(), userAssessments.get(j).getTotalPointsAvailable()));
                   // System.out.println("Percent Total Points: " + percentTotalPoints);
                    double priority = assessmentPriorityFactor*((userAssessments.get(j).getPriority())/100);
                    //System.out.println("Priority: " + priority);
                    double assessmentFactor = daysLeftForAssessment + percentTotalPoints + priority;
                    if(daysLeftForAssessment != 0.0) {
                        subjectAssessmentFactor += assessmentFactor;
                    } else {
                        subjectAssessmentFactor += 0.0;
                    }
                    //System.out.println(assessmentFactor);
                }
            }
            subjectAssessmentFactor = subjectAssessmentFactor/2;
            if(subjectAssessmentFactor > 1) {
                subjectAssessmentFactor = 1;
            }
            double diffFromGoal = calculateDifferenceFromGoal(userSubjects.get(i).getGoalGrade(), userSubjects.get(i).getTotalPoints(), userSubjects.get(i).getCurrentPoints());
            double daysLeftForMP;
            if (user.get().getMarkingPeriodEndDate() == null) {
                daysLeftForMP = 0;
            } else {
                daysLeftForMP = calculateDaysLeftForMP(user.get().getMarkingPeriodEndDate());
            }
            
            double subjectFactor = (assessmentFactor*(subjectAssessmentFactor)) + (goalFactor*(diffFromGoal)) + (mpFactor*(daysLeftForMP));
            userSubjectFactor.setSubjectFactor(subjectFactor);
            userSubjectFactor.setUserSubjectId(userSubjectId);
            userSubjectFactor.setSubjectName(userSubjects.get(i).getSubject().get().getName());
            userSubjectFactor.setColorId(userSubjects.get(i).getColorId());

            userSubjectFactors.add(userSubjectFactor);
        }
        double totSubjectFactors = 0.0;
        for(int k=0; k<userSubjectFactors.size(); k++) {
            totSubjectFactors += userSubjectFactors.get(k).getSubjectFactor();
        }
        for(int n=0; n<userSubjectFactors.size(); n++) {
            userSubjectFactors.get(n).setSubjectFactor((userSubjectFactors.get(n).getSubjectFactor())/totSubjectFactors);
            double totTime = user.get().getTotalTime();
            userSubjectFactors.get(n).setStudyTime(userSubjectFactors.get(n).getSubjectFactor()*totTime);
        }
        return userSubjectFactors;
    }
}
