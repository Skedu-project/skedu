import React from 'react';
import { Container } from 'reactstrap'; 
import Subject from '../subject/Subject';

class SubjectList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const subjects = this.props.subjects;
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