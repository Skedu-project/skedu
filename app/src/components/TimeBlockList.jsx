import React from 'react';
import { Row, Col, Container, Input, CardTitle, Card, CardBody, CardHeader } from 'reactstrap'; 
import { withCookies } from 'react-cookie';
import TimeBlock from './time-block/TimeBlock';


class TimeBlockList extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        cookie: this.props.cookies,
        userSubjectFactorArray: []
    }
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

  async componentDidMount() {
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
    console.log(this.state.userSubjectFactorArray);
  }

  render() {
    return (
        <Card className="border border-0">
          <CardHeader style={{backgroundColor: "white", borderBottomColor: "lightGrey", borderBottomWidth: "2px", padding: "0px 0px 0px 6%"}}>
            <CardTitle><h4>Today's Study Time</h4></CardTitle>
          </CardHeader>
          <CardBody>
            <Container>
            {this.state.userSubjectFactorArray.map(userSubjectFactor => (<Row className="pb-2"><TimeBlock 
                color={userSubjectFactor.colorId} 
                subject={userSubjectFactor.subjectName}  
                time={Math.round(userSubjectFactor.studyTime)}
                percent={Math.round(100*userSubjectFactor.subjectFactor)} /></Row>))}
            </Container>
          </CardBody>
        </Card>
    );
  }
}

export default withCookies(TimeBlockList);