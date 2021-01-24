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
            cookie: this.props.cookies,
            isModalOpen: false,
            mpName: 0,
            mpEndDate: 0
        };
        this.switchFadeInState = this.switchFadeInState.bind(this);
        this.handleTotalTime = this.handleTotalTime.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this); 
        this.updateProfile = this.updateProfile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.toggle = this.toggle.bind(this);
    }
    changeDate() {
        this.setState({date: new Date().toDateString('en-US')});
    }
    changeTime() {
        this.setState({time: new Date().toLocaleTimeString('en-US')});
    }

    toggle() {
        this.setState(prevState => ({
          isModalOpen: !prevState.isModalOpen
        }));
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

    
    async handleSubmit(event){
        event.preventDefault();
        const data = new FormData(event.target);
        const formValues = Object.fromEntries(data);
        const formJSON = JSON.stringify(formValues);
        this.updateProfile(formJSON); 
      }

    async updateProfile(formJSON){
        await fetch('/api/users/' + this.props.cookies.get('id') + '/saveProfile', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',  //receiving data in JSON format in browser
                'Content-Type': 'application/json'  //sending data in JSON format
            },
            body: formJSON
        });
      }

    
    render() {
        const headerStyle = {
            backgroundColor: "#B8B8B8",
            height: "100%"
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
            <div className="ml-3 mr-3">
                <Row style={headerStyle} className="rounded-lg">
                        <Col xs={10}>
                            <Row><h1 className="ml-3">My Planner</h1></Row>
                            <Row>
                                <Col xs={7}><h4>{this.state.date} | MP 2 | {this.state.time}</h4></Col>
                                <Col xs={5}><Button color="primary" onClick={this.switchFadeInState}><h6>Study Time Today: {this.state.totalTime}</h6></Button></Col>
                            </Row>
                        </Col>
                        <Col xs={2}>
                            <div className="col-3"></div>
                            <div className="h-100 col-5 p-0" style={{textAlign: "center"}} id="profilePopover">
                            <ButtonGroup>
                                <ButtonGroup vertical id="profilePopover">
                                    <Button type="button" id="profilePopover" color="secondary" style={{height: "93%", width: "100%"}} onClick={this.toggle}>
                                        <h6>Profile</h6>
                                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggle}>
                                        <Form onSubmit={this.handleSubmit}>
                                        <ModalHeader>Profile</ModalHeader>
                                        <ModalBody>
                                            <FormGroup>
                                            <Label for="currentGradeLevel">Grade Level</Label>
                                            <Input type="select" id="currentGradeLevel" name="currentGradeLevel">
                                                <option value="" disabled selected>Select Grade Level</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                            </Input>
                                            </FormGroup>
                                            <FormGroup>
                                            <Label for="markingPeriodName">Marking Period</Label>
                                            <Input type="select" id="markingPeriodName" name="markingPeriodName">
                                                <option value="" disabled selected>Select Marking Period</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </Input>
                                            </FormGroup>
                                            <FormGroup>
                                            <Label for="markingPeriodEndDate">Marking Period End Date</Label>
                                            <Input type="date" id="markingPeriodEndDate" name="markingPeriodEndDate">
                                            <option value="" disabled selected>Select Marking Period</option>
                                            </Input>
                                            </FormGroup>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color='primary' type="submit" onClick={this.toggle}>Save</Button>{' '}
                                            <Button color='secondary' onClick={this.toggle}>Cancel</Button>
                                        </ModalFooter>
                                        </Form>
                                    </Modal>
                                    </Button>
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
                                        <Label for="totalTime">Study Time Today</Label>
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
        );
    }
}

export default withCookies(withRouter(HomePageHeader));