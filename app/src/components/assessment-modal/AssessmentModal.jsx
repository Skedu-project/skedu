import React from 'react';
import {Button, Modal, ModalBody, ModalHeader, ModalFooter, Form, FormGroup, Label, Input} from 'reactstrap';

class AssessmentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        updateAssessmentToggle: false, 
    }
    this.toggleUpdateAssessments = this.toggleUpdateAssessments.bind(this);  
    this.deleteAssessment = this.deleteAssessment.bind(this); 
    this.handleAssessment = this.handleAssessment.bind(this); 
    this.updateAssessmentInfo = this.updateAssessmentInfo.bind(this); 
  }

toggleUpdateAssessments() {
    var opp = !this.state.updateAssessmentToggle;
    this.setState({updateAssessmentToggle: opp});
}

componentDidMount(){
    console.log(this.props.id); 
}

async deleteAssessment(){
    await fetch('/api/assessments/' + this.props.id, {
        method: 'DELETE', 
        headers: {
          'Accept': 'application/json',  //receiving data in JSON format in browser
          'Content-Type': 'application/json'  //sending data in JSON format
        }
      }); 
      this.props.onClose(); 
      this.props.update(); 
}

handleAssessment(event){
  event.preventDefault();
  const data = new FormData(event.target);
  const formValues = Object.fromEntries(data);
  formValues.id = this.props.id; 
  formValues.userId = this.props.userId; 
  formValues.date = formValues.date; 
  formValues.userSubjectId = this.props.userSubjectId; 
  formValues.assessmentTypeName = formValues.assessmentTypeName; 
  formValues.totalPointsAvailable = formValues.totalPointsAvailable; 
  formValues.priority = formValues.priority; 
  formValues.isComplete = this.props.isComplete; 
  const formJSON = JSON.stringify(formValues);
  this.updateAssessmentInfo(formJSON);
}

async updateAssessmentInfo(formJSON){
  const response = await fetch('/api/assessments/' + this.props.id, {
    method: 'PUT',
    headers: {
        'Accept': 'application/json',  //receiving data in JSON format in browser
        'Content-Type': 'application/json'  //sending data in JSON format
    },
    body: formJSON
  });
  const body = await response.json();
  this.props.update(); 
}

  render() {
    return (
      <div>
           <Modal isOpen={this.props.isOpen} toggle={this.toggleUpdateAssessments}>
              <ModalHeader> Edit Assessment</ModalHeader>
                <Form onSubmit={this.handleAssessment}>
                   <ModalBody> 
                    <FormGroup>
                        <Label>Subject</Label>
                        <Input disabled defaultValue={this.props.subject}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="assessmentTypeName">Change Assessment Type</Label>
                        <Input type="select" name="assessmentTypeName" id="assessmentTypeName" defaultValue={this.props.assessmentType}>
                            <option> </option>
                            {this.props.assessmentTypes && this.props.assessmentTypes.map(assessmentType => (<option>{assessmentType}</option>))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="totalPointsAvailable">Change Total Points</Label>
                        <Input type="number" name="totalPointsAvailable" id="totalPointsAvailable" defaultValue={this.props.totalPointsAvailable}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="priority">Change Priority</Label>
                        <Input type="range" min="0" max="100" name="priority" id="priority" defaultValue={this.props.priority}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="date">Change Date</Label>
                        <Input type="date" name="date" id="date" defaultValue={this.props.date}/>
                    </FormGroup>
                    <FormGroup> 
                        <ModalFooter>
                            <Button color="primary" type="submit" onClick={this.props.onClose}>Submit</Button>
                            <Button color="danger" onClick={this.deleteAssessment}>Delete Assessment</Button>
                            <Button color="secondary" onClick={this.props.onClose}>Cancel</Button>
                        </ModalFooter>
                    </FormGroup> 
                    </ModalBody>
                </Form>
            </Modal>
      </div>
    )
  }
}

export default AssessmentModal;