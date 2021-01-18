import React from 'react';
import { withCookies } from 'react-cookie';
import { Container, Col, Row } from 'reactstrap'; 
import HomePageHeader from './home-page-header/HomePageHeader';
import HomePageAssessments from './home-page-assessments/HomePageAssessments';
import LeftPanel from './left-panel/LeftPanel'; 
import TimeBlockList from './TimeBlockList';

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
        const largeContainer = {
            height: "100vh",
            width: "100vw",
            paddingLeft: "15px",
            paddingRight: "0px",
            position: "fixed"
        };
        return(
            <div style={largeContainer}>
            <Row style={{height:"100%", padding: "10px", backgroundColor: "white"}}>
                <Col id="subject nav bar" xs={2} className="p-0"/*style={{backgroundColor: "whiteSmoke"}}*/>
                    <LeftPanel style={{height: "100%"}} subjects={this.state.subjects} refresh={this.getSubjects}/>
                </Col>
                <Col xs={10} id="right">
                    <Row style={{}}>
                        <Col id="header"><HomePageHeader /></Col>
                    </Row>
                    <Row id="bot_right" style={{height: "88%", padding: "10px"}}>
                        <Col id="HW time" xs={8} style={{height: "100%"}}>
                            <Container>
                                <TimeBlockList />
                            </Container>
                        </Col>
                        <Col xs={4} style={{height: "100%"}}>
                            <HomePageAssessments subjects={this.state.subjects}/>
                        </Col>
                        </Row>
                </Col>
            </Row>
            </div>
        );
    }
}

export default withCookies(HomePage);