import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, Card } from 'reactstrap';

class HomePage extends React.Component {
    render() {
        return(
            <Container>
                <h2>Success!</h2>
            </Container>
        );
    }
}

export default withRouter(HomePage);