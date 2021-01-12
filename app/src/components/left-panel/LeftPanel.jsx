import React from 'react';
import { Card, CardBody, CardHeader, CardFooter } from 'reactstrap'; 
import SubjectList from '../subject-list/SubjectList';
import AddSubject from './AddSubject'; 


class LeftPanel extends React.Component {

    constructor(props) {
        super(props);   
        this.state = {
            allSubjects: [],
            //subjects: [],
            allColors: []
        };
        this.getAllSubjects = this.getAllSubjects.bind(this);
        // this.getSubjects = this.getSubjects.bind(this); 
        this.getAllColors = this.getAllColors.bind(this);
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

    async getAllColors(){
        const response = await fetch('/api/subjectColors', {
            method: 'GET', 
            headers: {
                'Accept': 'application/json',  //receiving data in JSON format in browser
                'Content-Type': 'application/json'  //sending data in JSON format
            }
        }); 
        const body = await response.json();
        this.setState({allColors: body});
    } 

    async componentWillMount(){
        this.getAllSubjects();
        this.getAllColors(); 
    }

    render() {
        const userSubjects = this.props.subjects;
        return (
            <Card className="m-1" style={{height: "100%"}}>
                <CardHeader style={{backgroundColor: "lightGray"}}>
                    <h3 style={{textAlign: "center"}}>My Subjects</h3>
                </CardHeader>
                <CardBody style={{overflowY: 'scroll', backgroundColor: "white"}}>
                    <SubjectList subjects={userSubjects}/>
                </CardBody>
                <CardFooter style={{backgroundColor: "lightGray"}}>
                    <div style={{textAlign: "center"}}>
                        <AddSubject allSubjects={this.state.allSubjects} currentGradeLevel={9} allColors={this.state.allColors} onSave={this.props.refresh}/> 
                    </div>  
                </CardFooter>
            </Card>
        )
    }
}

export default LeftPanel; 