import React from 'react';
import { Row, Col, Container, Progress, Modal, ModalBody, ModalHeader, ModalFooter, Input, InputGroup, InputGroupAddon, InputGroupText, Button, FormGroup, Form, Label } from 'reactstrap'; 
import { withCookies } from 'react-cookie';
import classNames from 'classnames/bind';
import styles from '../settings-modal/DarkMode.scss'; 
const style = classNames.bind(styles);

class Subject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      difference: 0,
      color: "",
      editedUserSubject: {},
      userSubjectToggle: false, 
      actualGrade: 0,
      goalGrade: 0,
    };
    this.checkAtGoalGrade = this.checkAtGoalGrade.bind(this);
    this.toggleUserSubject = this.toggleUserSubject.bind(this);
    this.handleSubject = this.handleSubject.bind(this);
    this.deleteSubject = this.deleteSubject.bind(this);
    this.setActualGrade = this.setActualGrade.bind(this);
    this.updateSubjectInfo = this.updateSubjectInfo.bind(this); 

  }

  setActualGrade(){
    this.setState({actualGrade: this.props.actualGrade});
  }

  checkAtGoalGrade(actualGrade, goalGrade){
    if(actualGrade >= goalGrade){
      this.setState({difference: actualGrade - goalGrade});
      this.setState({color: "success"})
    } else {
      this.setState({difference: goalGrade - actualGrade});
      this.setState({color: "danger"})
    }
  }

  componentDidMount() {
    this.setActualGrade(); 
    this.checkAtGoalGrade(this.props.actualGrade, this.props.goalGrade); 
  }
  
  toggleUserSubject() {
    var opp = !this.state.userSubjectToggle;
    this.setState({userSubjectToggle: opp});
  }

  handleSubject(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const formValues = Object.fromEntries(data);
    formValues.id = this.props.id; 
    formValues.userId = this.props.userId; 
    formValues.subjectId = this.props.subjectId;
    formValues.userGradeLevel = this.props.userGradeLevel; 
    formValues.goalGrade = formValues.goalGrade; 
    formValues.colorId = formValues.colorId; 
    formValues.currentPoints = formValues.currentPoints;
    formValues.totalPoints = formValues.totalPoints; 
    if(formValues.totalPoints == 0){
      this.setState({actualGrade: 0}); 
    } else{
      this.setState({actualGrade: (formValues.currentPoints/formValues.totalPoints)*100}); 
    }
    this.setState({goalGrade: formValues.goalGrade});
    const formJSON = JSON.stringify(formValues);
    this.updateSubjectInfo(formJSON);
  }

  async updateSubjectInfo(formJSON){
    const response = await fetch('/api/users/' + this.props.userSubjectId + '/subject', {
      method: 'PUT',
      headers: {
          'Accept': 'application/json',  //receiving data in JSON format in browser
          'Content-Type': 'application/json'  //sending data in JSON format
      },
      body: formJSON
    });
    this.props.update(); 
    //progress bar refresh
    this.checkAtGoalGrade(this.state.actualGrade, this.state.goalGrade); 
  }
  

  async deleteSubject() {
    await fetch('/api/users/' + this.props.userSubjectId + '/subject', {
      method: 'DELETE', 
      headers: {
        'Accept': 'application/json',  //receiving data in JSON format in browser
        'Content-Type': 'application/json'  //sending data in JSON format
      }
    }); 
    this.toggleUserSubject(); 
    this.props.update(); 
  }

  render() {
    return (
      <div>
      <Container onClick={this.toggleUserSubject} style={{marginBottom: "10px"}} className={style('content')}>
        <Row style={{border: '1px solid', borderRadius: '7px'/*, height: "8vh"*/}}>
            <Col xs="1" className={this.props.color} style={{ /*width:'20px',*/ borderTopLeftRadius: '7px', borderBottomLeftRadius: '7px'}} />
            <Col xs="9" className="pb-2" style={{textAlign: 'center'}}>
                <h5>{this.props.name}</h5>
                <div style={{borderRadius: "2px"}} className={style('footer')}><h8 style={{}}>Goal: {this.props.goalGrade}%</h8></div>
                <div>
                  <Progress multi>
                    <Progress bar value={this.state.actualGrade} max="100">{this.state.actualGrade}</Progress>
                    <Progress bar color={this.state.color} value={this.state.difference}>{this.state.difference}</Progress>
                  </Progress>
                </div>
            </Col>
        </Row>
      </Container>

      <Modal isOpen={this.state.userSubjectToggle} toggle={this.toggleUserSubject}>
          <ModalHeader>Edit {this.props.name} Subject</ModalHeader>
          <Form onSubmit={this.handleSubject}>
            <ModalBody>
              <FormGroup>
                <Label>Course Marking Period Grade</Label>
                <InputGroup className="mb-3">
                <Input placeholder="Current Points" name="currentPoints" id="currentPoints" type="number" defaultValue={this.props.currentPoints}/>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>/</InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Total Points" name="totalPoints" id="totalPoints" type="number" defaultValue={this.props.totalPoints}/>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                    <Label for="goalGrade">Change Goal Grade</Label>
                    <Input type="number" id="goalGrade" name="goalGrade" placeholder="Enter Your Goal Grade" defaultValue={this.props.goalGrade}></Input>
              </FormGroup>
              <FormGroup>
                    <Label for="colorId">Change Color</Label>
                    <Input type="select" id="colorId" name="colorId" defaultValue={this.props.color}>
                      <option value="" disabled selected>Select Color</option>
                      {this.props.allColors && this.props.allColors.map(color => (<option value={color.id}>{color.displayName}</option> ))} 
                    </Input>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit" onClick={this.toggleUserSubject}>Submit</Button>
              <Button color="danger" onClick={this.deleteSubject}>Delete Subject</Button>
              <Button color="secondary" onClick={this.toggleUserSubject}>Cancel</Button>
            </ModalFooter>
          </Form>
      </Modal>
      </div>
    )
  }
}

export default withCookies(Subject); 