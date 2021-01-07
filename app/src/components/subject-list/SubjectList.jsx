import React from 'react';
import { Container } from 'reactstrap'; 
import Subject from '../subject/Subject';

class SubjectList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {subjects: []}; //no subjects 
    this.getSubjects = this.getSubjects.bind(this);
  }

  async getSubjects() {
    const response = await fetch('/api/users/1/subjects', { //connecting to api 
      method: 'GET',
      headers: {
          'Accept': 'application/json',  //receiving data in JSON format in browser
          'Content-Type': 'application/json'  //sending data in JSON format
      }
    });

    const body = await response.json();
    debugger;
    this.setState({subjects: body}); //subjects has users subjects
  }

  componentDidMount() {
    debugger;
    this.getSubjects();
  }

  render() {
    const subjects = this.state.subjects;
    return (
      <Container>{
        (subjects && subjects.length > 0) && (subjects.map(subjectItem => (
          <Subject color="red" name={subjectItem.subject.name} goalGrade={subjectItem.goalGrade} />
        )))
      }
    </Container>
    )
  }
}

export default SubjectList;