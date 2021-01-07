import React from 'react';
import { Container, Row, Col } from 'reactstrap'; 

class Subject extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container style={{margin:"10px"}}>
        <Row style={{border: '1px solid', borderRadius: '12px'}}>
            <Col xs="0" style={{backgroundColor:`${this.props.color}`, width:'20px', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px'}} />
            <Col xs="auto" style={{textAlign: 'center'}}>
                <div>{this.props.name}</div>
                <div>{this.props.goalGrade}</div>
            </Col>
        </Row>
      </Container>
    )
  }
}

export default Subject; 