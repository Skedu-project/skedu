import React from 'react';
import { Row, Col } from 'reactstrap'; 

class Subject extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{paddingBottom: "10px"}}>
        <Row style={{border: '1px solid', borderRadius: '12px'}}>
            <Col xs="0" className={this.props.color} style={{ width:'20px', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px'}} />
            <Col xs="9" style={{textAlign: 'center'}}>
                <div>{this.props.name}</div>
                <div>{this.props.goalGrade}%</div>
            </Col>
        </Row>
      </div>
    )
  }
}

export default Subject; 