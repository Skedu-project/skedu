import React from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; 
import { withCookies } from 'react-cookie';

class AddSubject extends React.Component {

    constructor(props) {
        super(props); 
        this.state  = {
          isModalOpen: false
        };

        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.saveSubject = this.saveSubject.bind(this); 
    }

    toggle() {
      this.setState(prevState => ({
        isModalOpen: !prevState.isModalOpen
      }));
    }

    handleSubmit(event){
      event.preventDefault();
      const data = new FormData(event.target);
      const formValues = Object.fromEntries(data);
      // const fromValues = {
      //   subjectId: 1,
      //   goalGrade: 80,
      //   colorId: 1,
      // }
      formValues.userGradeLevel = this.props.currentGradeLevel;
      const formJSON = JSON.stringify(formValues);
      this.saveSubject(formJSON); 
    }

    async saveSubject(formJSON){
      await fetch('/api/users/' + this.props.cookies.get('id') + '/subjects', { //connecting to api 
        method: 'POST',
        headers: {
            'Accept': 'application/json',  //receiving data in JSON format in browser
            'Content-Type': 'application/json'  //sending data in JSON format
        }, 
        body: formJSON
      });
      this.props.onSave();
    }
    
    render() {
        return (
          <div>
          <Button color='secondary' onClick={this.toggle}>
            + Add Subject
          </Button>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggle} className={this.props.className}>
            <Form onSubmit={this.handleSubmit}>
              <ModalHeader toggle={this.toggle}>Add Your Subjects</ModalHeader>
              <ModalBody>
                  <FormGroup>
                    <Label for="subjectId">Subject</Label>
                    <Input type="select" id="subjectId" name="subjectId" required>
                      <option value="" disabled selected>Select Subject</option>
                      {this.props.allSubjects && this.props.allSubjects.map(subject => (<option value={subject.id}>{subject.name}- {subject.gradeLevel}</option> ))} 
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="goalGrade">Goal Grade</Label>
                    <Input type="number" id="goalGrade" name="goalGrade" placeholder="Enter Your Goal Grade" required></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="colorId">Color</Label>
                    <Input type="select" id="colorId" name="colorId">
                      <option value="" disabled selected>Select Color</option>
                      {this.props.allColors && this.props.allColors.map(color => (<option value={color.id}>{color.displayName}</option> ))} 
                    </Input>
                  </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color='primary' type="submit">Save</Button>{' '}
                <Button color='secondary' onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
          </Form>
        </Modal>
        </div>
        )
    }
}

export default withCookies(AddSubject); 