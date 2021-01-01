import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, Card, Fade, InputGroup } from 'reactstrap';

class HomePageHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date().toDateString(),
            time: new Date().toLocaleTimeString('en-US'),
            fadeIn: false,
            totalTime: 0
        };
        this.switchState = this.switchState.bind(this);
        this.handleTotalTime = this.handleTotalTime.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
    }
    changeDate() {
        this.setState({date: new Date().toDateString()});
    }
    changeTime() {
        this.setState({time: new Date().toLocaleTimeString('en-US')});
    }
    async componentWillMount() {
        setInterval(this.changeDate.bind(this), 60000);
        setInterval(this.changeTime.bind(this), 1000);
        const response = await fetch('/api/usersByEmail?email=maria_tom@gmail.com&totalTime=', {  //email is hard coded
            method: 'GET',
            headers: {
                'Accept': 'application/json',  //receiving data in JSON format in browser
                'Content-Type': 'application/json'  //sending data in JSON format
            }
        });
        const body = await response.json();
        console.log(body);
        this.setState({totalTime: body.totalTime});
    }
    switchState() {
        var opp = this.state.fadeIn;
        this.setState({fadeIn: !opp});
    }
    async handleTotalTime(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const response = await fetch('/api/userTotalTime?email=maria_tom@gmail.com&totalTime=' + data.get('totalTime'), {  //email is hard coded
            method: 'PUT',
            headers: {
                'Accept': 'application/json',  //receiving data in JSON format in browser
                'Content-Type': 'application/json'  //sending data in JSON format
            }
        });
        const body = await response.json();
        this.setState({totalTime: body});
        this.setState({fadeIn: false});
    }
    async handleSignOut(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const response = await fetch('/api/userIsSignedIn?email=maria_tom@gmail.com&signIn=false', {   //email is hard coded
            method: 'PUT',
            headers: {
                'Accept': 'application/json',  //receiving data in JSON format in browser
                'Content-Type': 'application/json'  //sending data in JSON format
            }
        });
        const body = await response.json();
        if(!body) {
            this.props.history.push('/');
        } else {
            alert("There is something wrong with the Sign out.")
        }
    }
    render() {
        const headerStyle = {
            backgroundColor: "#B8B8B8",
            padding: "30px",
            width: "1000px"
        }
        const fadeInStyle = {
            backgroundColor: "rgb(91, 192, 222, 0.8)",
            padding: "15px",
            width: "250px",
            borderRadius: "5%"
        }
        return(
            <Container>
                <div className="container">
                <div style={headerStyle} className="row">
                    <div className="container m-0 col-8" style={{width: "500px"}} id="hi">
                        <h2>My Planner</h2>
                        <div className="row">
                            <h4 className="col-8">{this.state.date} | MP 2 | {this.state.time}</h4>  {/*marking Period is hard coded*/}
                            <Button color="info" onClick={this.switchState} className="col-4">HW Time Today: {this.state.totalTime}</Button>
                        </div>
                    </div>
                    <Form onSubmit={this.handleSignOut} className="col-4">
                        <Button type="submit" color="danger">Sign Out</Button>
                    </Form>
                </div>
                    <Fade in={this.state.fadeIn} className="mt-3">
                        <div style={fadeInStyle}>
                            <Form onSubmit={this.handleTotalTime}>
                                <FormGroup>
                                    <Label for="totalTime">Homework Time Today</Label>
                                    <div className="container">
                                    <div className="row">
                                        <Input type="number" name="totalTime" id="totalTime" /*style={{width: "100px"}}*/ className="col-6"/>
                                        <div className="col-6">
                                            <Button color="light" type="submit">Submit</Button>
                                        </div>
                                    </div>
                                    </div>
                                </FormGroup>
                            </Form>
                        </div>
                    </Fade>
                </div>
                <div>

                </div>
            </Container>
        );
    }
}

export default withRouter(HomePageHeader);