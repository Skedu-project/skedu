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
      <Container className="p-0">{
        (subjects && subjects.length > 0) && (subjects.map(subjectItem => (
          <Subject color={subjectItem.colorId} name={subjectItem.subject.name} goalGrade={subjectItem.goalGrade} actualGrade={Math.round(subjectItem.currentPoints/subjectItem.totalPoints*100)}/>
        )))
      }
    </Container>
    )
  }
}

export default SubjectList;