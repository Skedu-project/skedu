import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { withCookies } from 'react-cookie';

class CreateAccount extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);  //Not Object File type
        const cookie = this.props.cookies;
        const time = new Date(Date.now()+(4.32*10000000));
        cookie.set('email', data.get('email'), {expires: time});
        if (data.get('password') == data.get('verifyPassword')) {
            const data2 = {
                firstName: data.get('firstName'),
                lastName: data.get('lastName'),
                email: data.get('email'),
                password: data.get('password')
            }
            //const value = Object.fromEntries(data2.entries());  //converts form file type into Object
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',  //receiving data in JSON format in browser
                    'Content-Type': 'application/json'  //sending data in JSON format
                },
                body: JSON.stringify(data2)
            });
            const body = await response.json();
            cookie.set('id', body.id, {expires: time});
        }
        else {
            alert("passwords do not match");
        }
        this.props.history.push('/home');
    }

    render() {
        return(
            <Container>
                <h2 style={{textAlign: "center"}}>Create Account</h2>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="fName">First Name</Label>
                        <Input type="text" name="firstName" id="fName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="lName">Last Name</Label>
                        <Input type="text" name="lastName" id="lName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="verifyPassword">Verify Password</Label>
                        <Input type="password" name="verifyPassword" id="verifyPassword"/>
                    </FormGroup>
                    <div style={{textAlign: "center"}}>
                        <Button color="primary" type="submit">Sign Up</Button>
                    </div>
                </Form>
            </Container>
        );
    }
}

export default withRouter(withCookies(CreateAccount));