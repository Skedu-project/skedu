import React from 'react';
import { withRouter } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { Container, Col, Row, Button, Input } from 'reactstrap';
import classNames from 'classnames/bind';
import styles from'./AssessmentBlock.css';
import AssessmentModal from '../assessment-modal/AssessmentModal';
const style = classNames.bind(styles);

class AssessmentBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assessmentId: 0,
            textColor: "",
            date: new Date().toDateString('en-US'),
            daysToAssessment: 0, 
            isOpen: false
        }
        this.deleteAssessment = this.deleteAssessment.bind(this);
        this.updateColor = this.updateColor.bind(this);
        this.openAssessmentModal = this.openAssessmentModal.bind(this); 
        this.closeAssessmentModal = this.closeAssessmentModal.bind(this);
        this.setComponentState = this.setComponentState.bind(this);
    }

    updateColor() {
        if(this.props.color == "bg-warning" || this.props.color == "bg-light") {
            this.setState({textColor: "dark"});
        } else {
            this.setState({textColor: "white"});
        }
    }

    openAssessmentModal() {
        this.setState({isOpen: true});
      }

    closeAssessmentModal() {
        this.setState({isOpen: false});
      }

    componentDidMount() {
        this.setComponentState();
    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.props.length !== prevProps.length) 
        || (this.props.color !== prevProps.color)
        || (this.props.id !== prevProps.id)) {
          this.setComponentState();
        }
      }

    setComponentState() {
        this.setState({assessmentId: this.props.id});
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
        const resonse = await fetch('/api/users/' + this.state.assessmentId + '/assessments?isComplete=' + !this.props.complete, {
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
            <Container fluid className="rounded" style={{border: "1px solid"}}>
                <Row style={{height: "100%"}}>
                    <Col xs={1} className={"p-0 " + this.props.color} style={{textAlign: "center"}}>
                        <Input name="assessment" type="radio" checked={false} onClick={this.deleteAssessment} style={{margin: "0%", transform: "scale(2)", verticalAlign: 'middle', height: '100%', zIndex: "2"}} className={style('checkButton')}/>
                    </Col>
                    <Col xs={9} className={this.props.color+" m-0 text-" + this.state.textColor} style={{textAlign: "center", height: "100%"}} onClick={this.openAssessmentModal}>
                        <h5 className="p-2 m-0" style={{}}>{this.props.subject}</h5>
                    </Col>
                    <Col xs={2} style={{textAlign: "center", borderLeft:"1px solid"}} className="m-0 p-2">
                        <h6 className="p-0 m-0">{this.props.date}</h6>
                    </Col>
                </Row>
                <AssessmentModal 
                isOpen={this.state.isOpen} 
                onClose={this.closeAssessmentModal} 
                subject={this.props.subjectName}
                assessmentTypes={this.props.assessmentTypes}
                assessmentType={this.props.assessmentTypeName}
                assessmentInfo={this.props.assessmentInfo}
                totalPointsAvailable={this.props.totalPointsAvailable}
                priority={this.props.priority}
                date={this.props.dateRaw}
                update={this.props.update}
                id={this.state.assessmentId}
                userId={this.props.userId}
                userSubjectId={this.props.userSubjectId}/> 
            </Container>
        );
    }
}

export default withCookies(AssessmentBlock);