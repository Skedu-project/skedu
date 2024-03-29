import React from 'react';
import { Card, CardBody, CardHeader, CardFooter } from 'reactstrap'; 
import SubjectList from '../subject-list/SubjectList';
import AddSubject from './AddSubject'; 
import classNames from 'classnames/bind';
import styles from '../settings-modal/DarkMode.scss'; 
const style = classNames.bind(styles);


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
        //this.changeMessage();
        return (
            <Card style={{height: "100%"}}>
                <CardHeader className={style('header')}>
                    <h3 style={{textAlign: "center"}}>Subjects</h3>
                </CardHeader>
                <CardBody style={{overflowY: 'scroll'}} className={style('content')}>
                    {(this.props.subjects.length == 0) && (<p style={{opacity: "0.5"}}>Please input your subjects</p>)}
                    <SubjectList subjects={userSubjects}  allColors={this.state.allColors} onSave={this.props.refresh}/>
                </CardBody>
                <CardFooter className={style('footer')}>
                    <div style={{textAlign: "center"}}>
                        <AddSubject allSubjects={this.state.allSubjects} allColors={this.state.allColors} onSave={this.props.refresh} currentGradeLevel={9}/> 
                    </div>  
                </CardFooter>
            </Card>
        )
    }
}

export default LeftPanel; 