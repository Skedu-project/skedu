import React from 'react';
import { Container, Button, Row, Col } from 'reactstrap'; 
import SubjectList from '../subject-list/SubjectList';

class LeftPanel extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Container>
                <SubjectList />
                <Button color="primary">Add Subject</Button>
            </Container>
        )
    }
}

export default LeftPanel; 