import React from 'react';
import { withRouter } from 'react-router-dom';
import { CookiesProvider, withCookies } from 'react-cookie';
import { Container, Col, Row } from 'reactstrap'; 
import HomePageHeader from './home-page-header/HomePageHeader';
import HomePageAssessments from './home-page-assessments/HomePageAssessments';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const cookie = this.props.cookies;
        if (!cookie.get('email')) {
            this.props.history.push('/');
            return null;
        }
        const smallerContainer = {
            height: "650px",
           /* width: (window.innerWidth-30),*/
            position: "relative"
        };
        const largeContainer = {
            height: (window.innerHeight-8),
            width: (window.innerWidth-12),
            position: "relative"
        };
        return(
            <Container fluid className="m-0" style={largeContainer}>
                <Row style={largeContainer}>
                    <Col id="subject nav bar" className="p-1 border-right" md={2} style={{backgroundColor: "whiteSmoke"}}> subject nav bar </Col>
                    <Col id="right" className="p-1">
                        <Container fluid style={smallerContainer} className="m-0 p-0">
                            <Row><Col id="header"><HomePageHeader /></Col></Row>
                            <Row className="m-0" id="bot_right" style={smallerContainer}>
                                <Col id="HW time" md={8}> HW time </Col>
                                <Col style={{backgroundColor: "whiteSmoke"}}><HomePageAssessments /></Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withCookies(HomePage);