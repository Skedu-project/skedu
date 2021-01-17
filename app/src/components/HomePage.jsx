import React from 'react';
import { withCookies } from 'react-cookie';
import { Container, Col, Row } from 'reactstrap'; 
import HomePageHeader from './home-page-header/HomePageHeader';
import HomePageAssessments from './home-page-assessments/HomePageAssessments';
import LeftPanel from './left-panel/LeftPanel'; 
import TimeBlock from './time-block/TimeBlock'

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects: []
        };
        this.getSubjects = this.getSubjects.bind(this); 
    }

    async getSubjects() {
        const response = await fetch('/api/users/ ' + this.props.cookies.get('id') + '/subjects', { //connecting to api 
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
        this.getSubjects();
    }
      
    render() {
        const cookie = this.props.cookies;
        if (!cookie.get('email')) {
            this.props.history.push('/');
            return null;
        }
        const smallerContainer = {
            height: "86vh",
           /* width: (window.innerWidth-30),*/
            position: "relative"
        };
        const largeContainer = {
            height: "99vh",
            width: "99vw",
            position: "relative",
        };
        return(
            <Container fluid className="m-0" style={largeContainer}>
                <Row style={largeContainer}>
                    <Col id="subject nav bar" className="p-1" md={2} /*style={{backgroundColor: "whiteSmoke"}}*/>
                        <LeftPanel subjects={this.state.subjects} refresh={this.getSubjects}/>
                    </Col>
                    <Col id="right" className="p-1">
                        <Container fluid style={{position: "relative", height: "100%"}} className="m-0 p-0">
                            <Row style={{height: "12%", position: "relative"}}><Col id="header"><HomePageHeader /></Col></Row>
                            <Row fluid className="m-0" id="bot_right" style={{height: "88%", position: "relative"}}>
                                <Col id="HW time" md={8}>
                                    <Container>
                                        <TimeBlock />
                                    </Container>
                                </Col>
                                <Col className="p-0"><HomePageAssessments subjects={this.state.subjects}/></Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withCookies(HomePage);