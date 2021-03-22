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
        (subjects && subjects.length > 0) && (subjects.map(subjectItem => {
          const totalPoints = subjectItem.totalPoints ? subjectItem.totalPoints : 1;
          return (
          <Subject 
          color={subjectItem.colorId} 
          name={subjectItem.subject.name} 
          goalGrade={subjectItem.goalGrade} 
          userSubjectId={subjectItem.id} 
          actualGrade={Math.round(subjectItem.currentPoints/totalPoints*100)}
          allColors={this.props.allColors} 
          update={this.props.onSave}
          subjectId={subjectItem.subject.id}
          userId={subjectItem.userId}
          userGradeLevel={subjectItem.userGradeLevel}
          id={subjectItem.id}
          currentPoints={subjectItem.currentPoints}
          totalPoints={subjectItem.totalPoints}/>)}
        ))
      }
    </Container>
    )
  }
}

export default SubjectList;