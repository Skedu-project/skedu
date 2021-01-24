import React from 'react';
<<<<<<< HEAD
import { Row, Col, Container, Progress } from 'reactstrap'; 
=======
import { Row, Col, Container, Modal, ModalBody, ModalHeader, ModalFooter, Input, InputGroup, InputGroupAddon, InputGroupText, Button, FormGroup, Form, Label } from 'reactstrap'; 
>>>>>>> f3aae44 (home page changes)

class Subject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
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
=======
      editedUserSubject: {},
      userSubjectToggle: false
    }
    this.toggleUserSubject = this.toggleUserSubject.bind(this);
    this.handleSubject = this.handleSubject.bind(this);
  }
  
  toggleUserSubject() {
    var opp = !this.state.userSubjectToggle;
    this.setState({userSubjectToggle: opp});
  }

  async handleSubject(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const response = await fetch('/api/users/' + this.props.userSubjectId + '/subject?currentPoints=' + data.get('currentPoints') + '&totalPoints=' + data.get('totalPoints'), {
      method: 'PUT',
      headers: {
          'Accept': 'application/json',  //receiving data in JSON format in browser
          'Content-Type': 'application/json'  //sending data in JSON format
      }
    });
    //update
>>>>>>> f3aae44 (home page changes)
  }

  render() {
    return (
      <div>
      <Container onClick={this.toggleUserSubject} style={{marginBottom: "10px", backgroundColor: "whiteSmoke"}}>
        <Row style={{border: '1px solid', borderRadius: '7px'/*, height: "8vh"*/}}>
            <Col xs="1" className={this.props.color} style={{ /*width:'20px',*/ borderTopLeftRadius: '7px', borderBottomLeftRadius: '7px'}} />
            <Col xs="9" style={{textAlign: 'center'}}>
                <h5>{this.props.name}</h5>
<<<<<<< HEAD
                <div style={{borderRadius: "2px", backgroundColor: "lightGray"}}><h8 style={{}}>Goal: {this.props.goalGrade}%</h8></div>
                <div>
                  <Progress multi>
                    <Progress bar value={this.props.actualGrade} max="100">{this.props.actualGrade}</Progress>
                    <Progress bar color={this.state.color} value={this.state.difference}>{this.state.difference}</Progress>
                  </Progress>
                </div>
=======
                <div style={{borderRadius: "2px", backgroundColor: "lightGray"}}><h6>{this.props.goalGrade}%</h6></div>
>>>>>>> f3aae44 (home page changes)
            </Col>
        </Row>
      </Container>

      <Modal isOpen={this.state.userSubjectToggle} toggle={this.toggleUserSubject}>
          <ModalHeader>Edit {this.props.name} Grade</ModalHeader>
          <Form onSubmit={this.handleSubject}>
            <ModalBody>
              <FormGroup>
                <Label>Course Marking Period Grade</Label>
                <InputGroup className="mb-3">
                <Input placeholder="Current Points" name="currentPoints" id="currentPoints" type="number"/>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>/</InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Total Points" name="totalPoints" id="totalPoints" type="number" />
                </InputGroup>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit" onClick={this.toggleUserSubject}>Submit</Button>
              <Button color="secondary" onClick={this.toggleUserSubject}>Cancel</Button>
            </ModalFooter>
          </Form>
      </Modal>
      </div>
    )
  }
}

export default Subject; 