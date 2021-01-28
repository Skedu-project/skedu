import React from 'react';
import { Row, Col, Container, Input, CardTitle, Card, CardBody, CardHeader } from 'reactstrap'; 
import { withCookies } from 'react-cookie';
import TimeBlock from './time-block/TimeBlock';
import logo from './skeduLogo.png';


class TimeBlockList extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        cookie: this.props.cookies,
        userSubjectFactorArray: []
    }
    this.getSubjectFactor = this.getSubjectFactor.bind(this);
  }

  compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const studyTimeA = a.studyTime;
    const studyTimeB = b.studyTime;
  
    let comparison = 0;
    if (studyTimeA < studyTimeB) {
      comparison = 1;
    } else if (studyTimeA > studyTimeB) {
      comparison = -1;
    }
    return comparison;
  }

  componentDidUpdate(prevProps) {
    if (this.props.subjects !== prevProps.subjects) {
      this.getSubjectFactor();
    }
  }

  async getSubjectFactor() {
    const response = await fetch('/api/users/' + this.state.cookie.get('id') + '/calculate', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',  //receiving data in JSON format in browser
            'Content-Type': 'application/json'  //sending data in JSON format
        }
    });
    const body = await response.json();
    var i;
    var calculationArray = [];
    for(i=0; i<body.length; i++) {
        calculationArray.push(body[i]);
    }
    calculationArray.sort(this.compare);
    this.setState({userSubjectFactorArray: calculationArray});
    //console.log(this.state.userSubjectFactorArray);
  }

  componentDidMount() {
    this.getSubjectFactor();
  }

  render() {
    return (
        <Card className="border border-0">
          <CardHeader style={{backgroundColor: "white", borderBottomColor: "lightGrey", borderBottomWidth: "2px", padding: "0px 0px 0px 6%"}}>
            <CardTitle><h4>Today's Study Time</h4></CardTitle>
          </CardHeader>
          <CardBody>
          {(this.state.userSubjectFactorArray.length == 0) && (
              <Container className="border border-secondary rounded-lg mt-5" style={{height: "40vh"}}>
                {/* <Row className="border-bottom border-secondary" style={{height: "15%", backgroundColor: "rgba(0, 123, 255, 0.5)"}}>
                  
                </Row> */}
                <Row style={{height: "100%"}}>
                  <Col xs={3} style={{textAlign: "center", backgroundColor: "rgba(0, 123, 255, 0.7)", paddingTop: "8%"}}>
                    <h2 className="p-2 text-white">Welcome to Skedu!</h2>
                    <img src={logo} style={{resizeMode: 'contain', height: "85px"}}/>
                  </Col>
                  <Col xs={9} className="pl-5 pt-4" style={{backgroundColor: "whiteSmoke", textAlign: "left"}}>
                    <h6 className="pl-3 pt-3 pb-2">Please do the following to get started:</h6>
                    <p className="pl-4">- Update your profile</p>
                    <p className="pl-4">- Enter your study time</p>
                    <p className="pl-4">- Add your subjects</p>
                    <p className="pl-5">- Click on the subject block to input your course grade</p>
                    <p className="pl-4">- Add any assessments</p>
                  </Col>
                </Row>
              </Container>
            )}
            <Container>
            {this.state.userSubjectFactorArray.map(userSubjectFactor => (<Row className="pb-2"><TimeBlock 
                color={userSubjectFactor.colorId} 
                subject={userSubjectFactor.subjectName ? userSubjectFactor.subjectName : "--"}  
                time={userSubjectFactor.studyTime ? Math.round(userSubjectFactor.studyTime) : "--"}
                percent={Math.round(100*userSubjectFactor.subjectFactor)} /></Row>))}
            </Container>
          </CardBody>
        </Card>
    );
  }
}

export default withCookies(TimeBlockList);