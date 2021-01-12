import React from 'react';
import { Row, Col, Container } from 'reactstrap'; 

class Subject extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container style={{marginBottom: "10px", backgroundColor: "whiteSmoke"}}>
        <Row style={{border: '1px solid', borderRadius: '7px', height: "8vh"}}>
            <Col xs="1" className={this.props.color} style={{ /*width:'20px',*/ borderTopLeftRadius: '7px', borderBottomLeftRadius: '7px'}} />
            <Col xs="9" style={{textAlign: 'center'}}>
                <h5>{this.props.name}</h5>
                <div style={{borderRadius: "2px", backgroundColor: "lightGray"}}><h6 style={{}}>{this.props.goalGrade}%</h6></div>
            </Col>
        </Row>
      </Container>
    )
  }
}

export default Subject; 