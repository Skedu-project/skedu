import React from 'react';
import { Card, CardBody, CardHeader, CardFooter } from 'reactstrap'; 
import SubjectList from '../subject-list/SubjectList';
import AddSubject from './AddSubject'; 


class LeftPanel extends React.Component {

    constructor(props) {
        super(props);   
        this.state = {
            allSubjects: [],
            subjects: []
        };
        this.getAllSubjects = this.getAllSubjects.bind(this);
        this.getSubjects = this.getSubjects.bind(this); 
    }

    async getAllSubjects(){
        const response = await fetch('/api/subjects', {
            method: 'GET', 
            headers: {
                'Accept': 'application/json',  //receiving data in JSON format in browser
                'Content-Type': 'application/json'  //sending data in JSON format
            }
        }); 
        const body = await response.json();
        this.setState({allSubjects: body});
    }

    async getSubjects() {
        const response = await fetch('/api/users/1/subjects', { //connecting to api 
          method: 'GET',
          headers: {
              'Accept': 'application/json',  //receiving data in JSON format in browser
              'Content-Type': 'application/json'  //sending data in JSON format
          }
        });
    
        const body = await response.json();
        this.setState({subjects: body}); //subjects has users subjects
      }

    async componentWillMount(){
        this.getAllSubjects();
        this.getSubjects();
    }

    render() {
        return (
            <Card style={{height: "100%"}}>
                <CardHeader>
                    <h3 style={{textAlign: "center"}}>My Subjects</h3>
                </CardHeader>
                <CardBody style={{overflowY: 'scroll'}}>
                    <SubjectList subjects={this.state.subjects} />
                </CardBody>
                <CardFooter>
                    <div style={{textAlign: "center"}}>
                        <AddSubject allSubjects={this.state.allSubjects} currentGradeLevel={9} onSave={this.getSubjects}/> 
                    </div>  
                </CardFooter>
            </Card>
        )
    }
}

export default LeftPanel; 