import React from 'react';
import { withRouter } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { Container, Row, Button, Card, CardBody, CardFooter, CardHeader, Modal, ModalBody, ModalHeader, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import AssessmentBlock from '../assessment-block/AssessmentBlock';

class HomePageAssessments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assessmentToggle: false,
            cookie: this.props.cookies,
            subjects: [],
            assessmentTypes: [],
            assessmentObjectArray: [],
            userSubjects: []
        }
        this.toggleAssessment = this.toggleAssessment.bind(this);
        this.handleAssessment = this.handleAssessment.bind(this);
        this.fetchAssessmentData = this.fetchAssessmentData.bind(this);
    }
    toggleAssessment() {
        var opp = !this.state.assessmentToggle;
        this.setState({assessmentToggle: opp});
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
        console.log("body: " + bodyAssessments);
        const assessmentsArray = [];
        var k;
        for(k=0; k<bodyAssessments.length; k++) {
            assessmentsArray.push(bodyAssessments[k]);
        }
        console.log(assessmentsArray);
        this.setState({assessmentObjectArray: assessmentsArray});
    }

    async componentDidMount() {
        const response = await fetch('/api/users/' + this.state.cookie.get('id') + '/subjects', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',  //receiving data in JSON format in browser
                'Content-Type': 'application/json'  //sending data in JSON format
            }
        });
        const body = await response.json();
        var i;
        var subjectArray = [];
        for(i=0; i < body.length; i++) {
            subjectArray.push(body[i].subject);
        }
        this.setState({subjects: subjectArray});
        this.setState({userSubjects: body})
        console.log(this.state.userSubjects);

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

    async handleAssessment(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        //console.log('/api/users/' + this.state.cookie.get('id') + '/subject?subjectName=' + data.get('userSubjects'));
        const response = await fetch('/api/users/' + this.state.cookie.get('id') + '/subjectName?subjectName=' + data.get('userSubjects'), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',  //receiving data in JSON format in browser
                'Content-Type': 'application/json'  //sending data in JSON format
            }
        });
        const body = await response.json();
        const subjectId = body.id;
        //console.log(body);
        const data2 = {
            assessmentTypeName: data.get('assessmentTypeName'),
            date: data.get('date'),
            priority: data.get('priority'),
            totalPointsAvailable: data.get('totalPointsAvailable'),
            userSubjectId: subjectId,
            userId: this.state.cookie.get('id')
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
        console.log(body2);
        this.fetchAssessmentData();
    }

    render() {
        return(
            <div>
            <Card style={{height: "86vh"}}>
                <CardHeader style={{textAlign: "center", padding: "10px", backgroundColor: "lightGray"}}><h2>Assessments</h2></CardHeader>
                <CardBody style={{overflowY: "scroll"}}>
                    <Container fluid>
                        {this.state.assessmentObjectArray.map(assessment => (<Row className="pb-2"><AssessmentBlock 
                            color={this.state.userSubjects.find(element => element.id == assessment.userSubjectId).colorId} 
                            subject={`${this.state.userSubjects.find(element => element.id == assessment.userSubjectId).subject.name} ${assessment.assessmentTypeName}`} 
                            date={`${new Date(assessment.date).getMonth()+1}/${new Date(assessment.date).getDate()+1}`} 
                            id={assessment.id} 
                            onUpdate={this.fetchAssessmentData} /></Row>))}
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