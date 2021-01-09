import React from 'react';
import { withRouter } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { Container, Col, Row, Button, Input } from 'reactstrap';
import classNames from 'classnames/bind';
import styles from'./AssessmentBlock.css';
const style = classNames.bind(styles);

class AssessmentBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assessmentId: this.props.id,
            textColor: "",
            date: new Date().toDateString('en-US'),
            daysToAssessment: 0
        }
        this.deleteAssessment = this.deleteAssessment.bind(this);
        this.updateColor = this.updateColor.bind(this);
    }

    updateColor() {
        if(this.props.color == "bg-warning") {
            this.setState({textColor: "dark"});
        } else {
            this.setState({textColor: "white"});
        }
    }

    componentDidMount() {
        this.updateColor();
        //resetting current date on mount
        this.setState({date: new Date().toDateString('en-US')});
        //calculations to find the difference between due date and current date
        var currentDate = new Date(this.state.date);
        var currentDateInt = Date.parse(currentDate); 
        var dueDateInt = Date.parse(this.props.dateFormat);
        var diff = ((dueDateInt - currentDateInt)/86400000)+1;  //86400000 is ms in a day
        this.setState({daysToAssessment: diff});
    }

    async deleteAssessment() {
        await fetch('/api/users/' + this.state.assessmentId + '/assessments?isComplete=' + !this.props.complete, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',  //receiving data in JSON format in browser
                'Content-Type': 'application/json'  //sending data in JSON format
            }
        });
        this.props.onUpdate();
        this.updateColor();
        //window.location.reload(false);    
    }

    render() {
        return(
            <Container fluid className="m-0 p-0 rounded border border-dark border-2" style={{height: "5vh", display: "inline-block", backgroundColor: "white"}}>
                <Row style={{height: "100%"}}>
                    <Col md={2} className="p-0" style={{/*backgroundColor: "lightgray", */textAlign: "center", top: "1.5vh"}}><Input type="radio" onClick={this.deleteAssessment} style={{margin: "0%", transform: "scale(2)"}} className={style('checkButton')}/></Col>
                    <Col md={8} className={this.props.color+" m-0 text-" + this.state.textColor} style={{/*padding: "2.1%",height: "100%",*/ textAlign: "center"}}><h5 className="p-0 m-0" style={{transform: "translateY(45%)"}}>{this.props.subject}</h5></Col>
                    <Col md={2.1} style={{textAlign: "center", position: "relative", top: "1.2vh", left: "1.2vh"/*paddingTop: "2%", paddingBottom: "1.9%" height: "100%"*/}} className="ml-2"><h6>{this.props.date}</h6></Col>
                </Row>
            </Container>
        );
    }
}

export default withCookies(AssessmentBlock);