import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, Card } from 'reactstrap';
import classNames from 'classnames/bind';
import styles from'./LogInAccount.css';
const cx = classNames.bind(styles);

class LogInAccount extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {isSignInSuccessful: false};
    }
    async handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const response = await fetch('/api/verifyUser?email=' + data.get('email') + '&password=' + data.get('password'), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',  //receiving data in JSON format in browser
                'Content-Type': 'application/json'  //sending data in JSON format
            }
        });
        const body = await response.json();
        this.setState({isSignInSuccessful: body});
        if (this.state.isSignInSuccessful) {
            const updateSignIn = await fetch('/api/userIsSignedIn?email=' + data.get('email') + '&signIn=true', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',  //receiving data in JSON format in browser
                    'Content-Type': 'application/json'  //sending data in JSON format
                }
            });
            this.props.history.push('/home');
        } else {
            alert("Sign in credentials did not match, please try again.");
        }
    }

    render() {
        return(
            <Container /*className="page-hero d-flex align-items-center justify-content-center"*/ style={{width:"400px"}}>
                <div className={cx('logInbackground')}>
                    <h2>Welcome Back!</h2>
                    <div>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" />
                        </FormGroup>
                        <div style={{textAlign: "center"}}>
                            <Button color="light" type="submit">Sign In</Button>
                        </div>
                    </Form>
                    </div>
                </div>
            </Container>
        );
    }
}

export default withRouter(LogInAccount);