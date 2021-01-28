import React from 'react';
import { withRouter } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { Container, Row, Button, Card, CardBody, CardFooter, CardHeader, Modal, ModalBody, ModalHeader, ModalFooter, Form, FormGroup, Label, Input, Collapse } from 'reactstrap';
import AssessmentBlock from '../assessment-block/AssessmentBlock';

class HomePageAssessments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assessmentToggle: false,
            completeAssessments: false,
            cookie: this.props.cookies,
            subjects: [],
            assessmentTypes: [],
            assessmentObjectArray: [],
            completeAssessmentObjectArray: [],
            userSubjects: [],
            message: "After inputting your subjects, please add any assessments so we can tell you how to study!"
        }
        this.toggleAssessment = this.toggleAssessment.bind(this);
        this.handleAssessment = this.handleAssessment.bind(this);
        this.fetchAssessmentData = this.fetchAssessmentData.bind(this);
        this.toggleCompleteAssessments = this.toggleCompleteAssessments.bind(this);
    }

    toggleAssessment() {
        var opp = !this.state.assessmentToggle;
        this.setState({assessmentToggle: opp});
    }

    toggleCompleteAssessments() {
        var opp = !this.state.completeAssessments;
        this.setState({completeAssessments: opp});
    }

    compare(a, b) {
        // Use toUpperCase() to ignore character casing
        const dateA = Date.parse(a.date);
        const dateB = Date.parse(b.date);
      
        let comparison = 0;
        if (dateA > dateB) {
          comparison = 1;
        } else if (dateA < dateB) {
          comparison = -1;
        }
        return comparison;
    }

    async fetchAssessmentData() {
        const responseGetAssessments = await fetch('/api/users/' + this.state.cookie.get('id') + '/assessments', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',  //receiving data in JSON format in browser
                'Content-Type': 'application/json'  //sending data in JSON format
            }
        });
        const bodyAssessments = await responseGetAssessments.json();
        const assessmentsArray = [];
        const completeAssessmentsArray = [];
        var k;
        for(k=0; k<bodyAssessments.length; k++) {
            if(!bodyAssessments[k].isComplete) {
                assessmentsArray.push(bodyAssessments[k]);
            } else {
                completeAssessmentsArray.push(bodyAssessments[k]);
            }
        }
        assessmentsArray.sort(this.compare);
        this.setState({assessmentObjectArray: assessmentsArray});
        this.setState({completeAssessmentObjectArray: completeAssessmentsArray});
        if(bodyAssessments.length != 0) {
            this.setState({message: ""});
        }
    }

    async componentDidMount() {
        const body = this.props.subjects; 
        var i;
        var subjectArray = [];
        for(i=0; i < body.length; i++) {
            subjectArray.push(body[i].subject);
        }
        this.setState({subjects: subjectArray});
        this.setState({userSubjects: body});

        const response2 = await fetch('/api/assessments', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',  //receiving data in JSON format in browser
                'Content-Type': 'application/json'  //sending data in JSON format
            }
        });
        const body2 = await response2.json();
        var j;
        var assessmentTypesArray = [];
        for(j=0; j < body2.length; j++) {
            assessmentTypesArray.push(body2[j].name);
        }
        this.setState({assessmentTypes: assessmentTypesArray});

        this.fetchAssessmentData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.subjects !== this.props.subjects) {
            const body = this.props.subjects; 
            var i;
            var subjectArray = [];
            for(i=0; i < body.length; i++) {
                subjectArray.push(body[i].subject);
            }
            this.setState({subjects: subjectArray});
            this.setState({userSubjects: body});
            console.log(this.state.userSubjects);
        }
    }

    async handleAssessment(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        var subjectId;
        var l;
        for(l=0;l<this.state.userSubjects.length;l++) {
            if(this.state.userSubjects[l].subject.name == data.get('userSubjects')) {
                console.log("in");
                subjectId = this.state.userSubjects[l].id;
            }
        }
        const data2 = {
            assessmentTypeName: data.get('assessmentTypeName'),
            date: data.get('date'),
            priority: data.get('priority'),
            totalPointsAvailable: data.get('totalPointsAvailable'),
            userSubjectId: subjectId,
            userId: this.state.cookie.get('id'),
            isComplete: false
        }
        const response2 = await fetch('/api/users/' + this.state.cookie.get('id') + '/assessments', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',  //receiving data in JSON format in browser
                'Content-Type': 'application/json'  //sending data in JSON format
            }, 
            body: JSON.stringify(data2)
        });
        const body2 = await response2.json();
        this.fetchAssessmentData();
    }

    render() {
        return(
            <div style={{height: "100%"}} >
            <Card style={{height: "100%"}}>
                <CardHeader style={{textAlign: "center", padding: "10px", backgroundColor: "lightGray"}}><h2>Assessments</h2></CardHeader>
                <CardBody style={{overflowY: "scroll", backgroundColor: "whiteSmoke", height: "100%"}}>
                    <p style={{opacity: "0.5"}}>{this.state.message}</p>
                    <Container>
                        {this.state.assessmentObjectArray.map(assessment => (this.state.userSubjects) && (this.state.userSubjects.length > 0) && (<Row className="pb-2"><AssessmentBlock 
                            color={this.state.userSubjects.find(element => element.id == assessment.userSubjectId).colorId} 
                            subject={`${this.state.userSubjects.find(element => element.id == assessment.userSubjectId).subject.name} ${assessment.assessmentTypeName}`} 
                            date={`${new Date(assessment.date).getMonth()+1}/${new Date(assessment.date).getDate()+1}`}
                            dateFormat={new Date(assessment.date).toDateString('en-US')}
                            complete={false} 
                            id={assessment.id} 
                            onUpdate={this.fetchAssessmentData} /></Row>))}
                        <Button onClick={this.toggleCompleteAssessments} color="dark" className="text-white mb-2 pt-0 pb-0 pl-1 pr-1" style={{opacity: "0.3"}}>Completed</Button>
                        <Collapse isOpen={this.state.completeAssessments}>
                        {this.state.completeAssessmentObjectArray.map(completedAssessment => (this.state.userSubjects) && (this.state.userSubjects.length > 0) && (<Row className="pb-2"><AssessmentBlock 
                            color={this.state.userSubjects.find(element => element.id == completedAssessment.userSubjectId).colorId} 
                            subject={`${this.state.userSubjects.find(element => element.id == completedAssessment.userSubjectId).subject.name} ${completedAssessment.assessmentTypeName}`} 
                            date={`${new Date(completedAssessment.date).getMonth()+1}/${new Date(completedAssessment.date).getDate()+1}`}
                            dateFormat={new Date(completedAssessment.date).toDateString('en-US')}
                            complete={true} 
                            id={completedAssessment.id} 
                            onUpdate={this.fetchAssessmentData} /></Row>))}
                        </Collapse>
                    </Container>
                </CardBody>
                <CardFooter style={{backgroundColor: "lightGray"}}>
                    <div style={{textAlign: "center", position: "relative"}}>
                        <Button color="secondary" onClick={this.toggleAssessment}>+ Add new Assessment</Button>
                    </div>
                </CardFooter>
            </Card>
            <Modal isOpen={this.state.assessmentToggle} toggle={this.toggleAssessment}>
                <ModalHeader toggle={this.toggleAssessment}>Add an Assessment</ModalHeader>
                <Form onSubmit={this.handleAssessment}>
                    <ModalBody>
                        <FormGroup>
                            <Label for="userSubjects">Subject</Label>
                            <Input type="select" name="userSubjects" id="userSubjects">
                                <option> </option>
                                {this.state.subjects.map(subject => (<option>{subject.name}</option>))}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="assessmentTypeName">Assessment</Label>
                            <Input type="select" name="assessmentTypeName" id="assessmentTypeName">
                                <option> </option>
                                {this.state.assessmentTypes.map(assessmentType => (<option>{assessmentType}</option>))}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="totalPointsAvailable">Total Points Available</Label>
                            <Input type="number" name="totalPointsAvailable" id="totalPointsAvailable" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="priority">Priority</Label>
                            {/* <Input type="number" name="priority" id="priority" /> */}
                            <Input type="range" min="0" max="100" name="priority" id="priority"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="date">Date</Label>
                            <Input type="date" name="date" id="date" />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit" onClick={this.toggleAssessment}>Submit</Button>
                        <Button color="secondary" onClick={this.toggleAssessment}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
            </div>
        );
    }
}

export default withCookies(HomePageAssessments);