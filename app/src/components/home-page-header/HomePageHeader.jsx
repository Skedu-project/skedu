import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Container, Row, Col, Form, FormGroup, Input, Label, Card, Fade, InputGroup, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { withCookies } from 'react-cookie';

class HomePageHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date().toDateString('en-US'),
            time: new Date().toLocaleTimeString('en-US'),
            fadeIn: false,
            totalTime: 0,
            popUp: true,
            userGradeLevel: 0,
            cookie: this.props.cookies
        };
        this.switchFadeInState = this.switchFadeInState.bind(this);
        this.handleTotalTime = this.handleTotalTime.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this); 
    }
    changeDate() {
        this.setState({date: new Date().toDateString('en-US')});
    }
    changeTime() {
        this.setState({time: new Date().toLocaleTimeString('en-US')});
    }
    async componentWillMount() {
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
        this.setState({userGradeLevel: body.currentGradeLevel});
        if(this.state.userGradeLevel != 0) {
            this.setState({popUp: false});
        } else {
            this.setState({popUp: true}); 
        }
    }
       
    switchFadeInState() {
        var opp = !this.state.fadeIn;
        this.setState({fadeIn: opp});
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
            padding: "0%"
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
                            <Button color="primary" onClick={this.switchFadeInState} className="col-3."><h6>Study Time Today: {this.state.totalTime}</h6></Button>
                        </Row>
                    </Col>
                    <Col className="row p-0" md={2}>
                        <div className="col-3"></div>
                        <div className="h-100 col-5 p-0" style={{textAlign: "center"}} id="profilePopover">
                        <ButtonGroup>
                            <ButtonGroup vertical id="profilePopover">
                                {/* <Button type="submit" className="mt-1" color="secondary" style={{width: "100%", height: "46.48%", borderRadius: "0px", borderTopLeftRadius: "10%"}}><h6>Profile</h6></Button>
                                <Button type="submit" color="secondary" style={{width: "100%", height: "46.48%", borderRadius: "0px", borderBottomLeftRadius: "10%"}}><h6>Settings</h6></Button> */}
                                <Button type="button" id="profilePopover" color="secondary" style={{height: "93%", width: "100%"}}><h6>Profile</h6></Button>
                                {/* <Popover placement="bottom" isOpen={this.state.popUp} target="profilePopover">
                                    <PopoverHeader>Update Profile</PopoverHeader>
                                    <PopoverBody>Your profile is not complete.</PopoverBody>
                                </Popover> */}
                                <Button type="button" color="dark" style={{height: "93%", width: "100%"}}><h6>Setting</h6></Button>
                            </ButtonGroup>
                            <Form onSubmit={this.handleSignOut} className="col-3 p-0" style={{textAlign: "center"}}>
                                <Button type="submit" color="danger" className="p-1" style={{width: "175%", height: "100%"}}><h6>Sign Out</h6></Button>
                            </Form>
                        </ButtonGroup>
                        </div>
                    </Col>
                </Row>
                    <Modal isOpen={this.state.fadeIn} toggle={this.switchFadeInState}>
                        <ModalHeader toggle={this.switchFadeInState}>How much time do you want to study today?</ModalHeader>
                        <Form onSubmit={this.handleTotalTime}>
                            <ModalBody>
                                <FormGroup>
                                    <Label for="totalTime">Homework Time Today</Label>
                                    <Input type="number" name="totalTime" id="totalTime"/>
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" type="submit" onClick={this.switchFadeInState}>Submit</Button>
                                <Button color="secondary" onClick={this.switchFadeInState}>Cancel</Button>
                            </ModalFooter>
                        </Form>
                    </Modal>
                </div>
            </Container>
        );
    }
}

export default withCookies(withRouter(HomePageHeader));