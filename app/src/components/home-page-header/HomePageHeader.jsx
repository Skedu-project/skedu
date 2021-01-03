import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Container, Row, Col, Form, FormGroup, Input, Label, Card, Fade, InputGroup } from 'reactstrap';
import { withCookies } from 'react-cookie';

class HomePageHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date().toDateString('en-US'),
            time: new Date().toLocaleTimeString('en-US'),
            fadeIn: false,
            totalTime: 0,
            cookie: this.props.cookies,
            show: "none"
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
    async componentDidMount() {
        setInterval(this.changeDate.bind(this), 60000);
        setInterval(this.changeTime.bind(this), 1000);
        const response = await fetch('/api/usersByEmail?email=' + this.state.cookie.get('email') + '&totalTime=', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',  //receiving data in JSON format in browser
                'Content-Type': 'application/json'  //sending data in JSON format
            }
        });
        const body = await response.json();
        this.setState({totalTime: body.totalTime});
    }
    switchState() {
        var opp = this.state.fadeIn;
        this.setState({fadeIn: !opp});
        if (opp) {
            this.setState({show: "block"});
        } else {
            this.setState({show: "none"});
        }
    }
    async handleTotalTime(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const response = await fetch('/api/userTotalTime?email=' + this.state.cookie.get('email') + '&totalTime=' + data.get('totalTime'), {
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
        console.log(this.state.cookie.get('email'));
        const response = await fetch('/api/userIsSignedIn?email=' + this.state.cookie.get('email') + '&signIn=false', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',  //receiving data in JSON format in browser
                'Content-Type': 'application/json'  //sending data in JSON format
            }
        });
        const body = await response.json();
        if(!body) {
            this.state.cookie.remove('email');
            this.props.history.push('/');
        } else {
            alert("There is something wrong with the Sign out.")
        }
    }
    render() {
        const headerStyle = {
            backgroundColor: "#B8B8B8",
            padding: "5px"
            /*width: "1000px"*/
        }
        const fadeInStyle = {
            backgroundColor: "rgb(91, 192, 222, 0.8)",
            padding: "15px",
            width: "200px",
            height: "100px",
            borderRadius: "5%",
            padding: "5%",
            textAlign: "center",
        }
        return(
            <Container fluid className="m-0 p-0">
                <div className="container-fluid m-2">
                <Row style={headerStyle} className="rounded-lg">
                    <Col className="container m-0" md={10} /*style={{width: "650px"}}*/>
                        <h1>My Planner</h1>
                        <Row>
                            <h4 className="col-8 m-0 pr-0">{this.state.date} | MP 2 | {this.state.time}</h4>  {/*marking Period is hard coded*/}
                            <Button color="info" onClick={this.switchState} className="col-3."><h6>HW Time Today: {this.state.totalTime}</h6></Button>
                        </Row>
                    </Col>
                    <Col className="row p-0" md={2}>
                        <div className="col-3"></div>
                        <div className="h-100 col-5 p-0" style={{textAlign: "center"}}>
                            <Button type="submit" className="mt-1" color="secondary" style={{width: "100%", height: "46.48%", borderRadius: "0px", borderTopLeftRadius: "10%"}}><h6>Profile</h6></Button>
                            <Button type="submit" color="secondary" style={{width: "100%", height: "46.48%", borderRadius: "0px", borderBottomLeftRadius: "10%"}}><h6>Settings</h6></Button>
                        </div>
                        <Form onSubmit={this.handleSignOut} className="col-3 p-0" style={{textAlign: "center"}}>
                            <Button type="submit" color="dark" className="mt-1" style={{width: "110%", height: "93%", borderRadius: "0px", borderBottomRightRadius: "10%", borderTopRightRadius: "10%"}}><h6>Sign Out</h6></Button>
                        </Form>
                    </Col>
                </Row>
                    <Fade in={this.state.fadeIn} className="mt-3" style={{zIndex: "1", position: "absolute"}}>
                        <div style={fadeInStyle}>
                            <Form onSubmit={this.handleTotalTime}>
                                <FormGroup>
                                    <Label for="totalTime">Homework Time Today</Label>
                                    <div className="container">
                                    <Row style={{height: "100px"}}>
                                        <div className="col-2"></div>
                                        <Input type="number" name="totalTime" id="totalTime" style={{borderBottomRightRadius: "0px", borderTopRightRadius: "0px"}} className="col-6"/>
                                        <div className="col-2.">
                                            <Button color="light" type="submit" style={{borderBottomLeftRadius: "0px", borderTopLeftRadius: "0px"}}>✔</Button>
                                        </div>
                                        <div className="col-2"></div>
                                    </Row>
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

export default withCookies(withRouter(HomePageHeader));