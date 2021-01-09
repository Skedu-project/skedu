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
            textColor: ""
        }
        this.deleteAssessment = this.deleteAssessment.bind(this);
    }
    componentDidMount() {
        if(this.props.color == "bg-warning") {
            console.log("in");
            this.setState({textColor: "dark"});
        } else {
            this.setState({textColor: "white"});
        }
        console.log(this.props.color+" m-0 text-" + this.state.textColor);
    }
    async deleteAssessment() {
        await fetch('/api/users/' + this.state.assessmentId + '/assessments', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',  //receiving data in JSON format in browser
                'Content-Type': 'application/json'  //sending data in JSON format
            }
        });
        console.log(this.state.assessmentId + typeof(this.state.assessmentId));
        this.props.onUpdate();
    }
    render() {
        return(
            <Container fluid className="m-0 p-0 rounded border border-dark border-2" style={{height: "5vh", display: "inline-block"}}>
                <Row>
                    <Col md={2.0} className="p-0" style={{/*backgroundColor: "lightgray", */textAlign: "center", top: "1.5vh"}}><Input type="radio" onClick={this.deleteAssessment} style={{margin: "0%", transform: "scale(2)"}} className={style('checkButton')}/></Col>
                    <Col md={8} className={this.props.color+" m-0 text-" + this.state.textColor} style={{padding: "2.1%", textAlign: "center"}}><h5 className="p-0 m-0">{this.props.subject}</h5></Col>
                    <Col md={2.1} style={{textAlign: "center", position: "relative", paddingTop: "2%", paddingBottom: "1.9%", paddingleft: "10%"}} className="ml-2"><h6>{this.props.date}</h6></Col>
                </Row>
            </Container>
        );
    }
}

export default withCookies(AssessmentBlock);