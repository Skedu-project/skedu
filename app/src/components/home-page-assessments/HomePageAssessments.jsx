import React from 'react';
import { withRouter } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { Container, Row, Button } from 'reactstrap';
import AssessmentBlock from '../assessment-block/AssessmentBlock';

class HomePageAssessments extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var i;
        return(
            <div>
                <h2 style={{textAlign: "center", padding: "10px"}}>Assessments</h2>
                <Container fluid>
                    <Row className="pb-2"><AssessmentBlock color="red" subject="subjectName" date="MM/DD" /></Row>
                </Container>
                <div style={{top: "480px", textAlign: "center", position: "relative"}}>
                    <Button color="secondary">+ Add new Assessment</Button>
                </div>
            </div>
        );
    }
}

export default withCookies(HomePageAssessments);