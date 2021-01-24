import React from 'react';
import { Row, Col, Container, Progress } from 'reactstrap'; 

class Subject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      difference: 0,
      color: ""
    };
    this.checkAtGoalGrade = this.checkAtGoalGrade.bind(this);
  }

  checkAtGoalGrade(){
    if(this.props.actualGrade >= this.props.goalGrade){
      this.setState({difference: this.props.actualGrade - this.props.goalGrade});
      this.setState({color: "success"})
    } else {
      this.setState({difference: this.props.goalGrade - this.props.actualGrade});
      this.setState({color: "danger"})
    }
  }

  componentDidMount() {
    this.checkAtGoalGrade(); 
  }

  render() {
    return (
      <Container style={{marginBottom: "10px", backgroundColor: "whiteSmoke"}}>
        <Row style={{border: '1px solid', borderRadius: '7px', height: "8vh"}}>
            <Col xs="1" className={this.props.color} style={{ /*width:'20px',*/ borderTopLeftRadius: '7px', borderBottomLeftRadius: '7px'}} />
            <Col xs="9" style={{textAlign: 'center'}}>
                <h5>{this.props.name}</h5>
                <div style={{borderRadius: "2px", backgroundColor: "lightGray"}}><h8 style={{}}>Goal: {this.props.goalGrade}%</h8></div>
                <div>
                  <Progress multi>
                    <Progress bar value={this.props.actualGrade} max="100">{this.props.actualGrade}</Progress>
                    <Progress bar color={this.state.color} value={this.state.difference}>{this.state.difference}</Progress>
                  </Progress>
                </div>
            </Col>
        </Row>
      </Container>
    )
  }
}

export default Subject; 