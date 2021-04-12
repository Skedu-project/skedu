import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Container, Row, Col, Form, FormGroup, Input, Label, Card, Fade, InputGroup, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { withCookies } from 'react-cookie';
import logo from '../skeduLogo.png'; 
import AddSubject from '../left-panel/AddSubject';
import SettingsModal from '../settings-modal/SettingsModal';
import classNames from 'classnames/bind';
import styles from '../settings-modal/DarkMode.scss'; 
const style = classNames.bind(styles);

// app\public
// app\src\components\home-page-header\HomePageHeader.jsx

class HomePageHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date().toDateString('en-US'),
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            fadeIn: false,
            totalTime: 0,
            popUp: true,
            userGradeLevel: 0,
            cookie: this.props.cookies,
            isModalOpen: false,
            mpName: 0,
            mpEndDate: "",
            user: {}, 
            isSettingOpen: false
        };
        this.switchFadeInState = this.switchFadeInState.bind(this);
        this.handleTotalTime = this.handleTotalTime.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this); 
        this.updateProfile = this.updateProfile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.toggle = this.toggle.bind(this);
        this.openSetting = this.openSetting.bind(this); 
        this.closeSetting = this.closeSetting.bind(this);
    }
    changeDate() {
        this.setState({date: new Date().toDateString('en-US')});
    }
    changeTime() {
        this.setState({time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})});
    }

    toggle() {
        this.setState(prevState => ({
          isModalOpen: !prevState.isModalOpen
        }));
      }

    openSetting() {
        this.setState({isSettingOpen: true});
      }

    closeSetting() {
        this.setState({isSettingOpen: false});
      }


    async componentDidMount() {
        setInterval(this.changeDate.bind(this), 60000);
        setInterval(this.changeTime.bind(this), 5000);
        const response = await fetch('/api/usersByEmail?email=' + this.state.cookie.get('email'), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',  //receiving data in JSON format in browser
                'Content-Type': 'application/json'  //sending data in JSON format
            }
        });
        const body = await response.json();
        this.setState({user: body});
        this.setState({totalTime: body.totalTime});
        this.setState({userGradeLevel: body.currentGradeLevel});
        this.setState({mpEndDate: new Date(body.markingPeriodEndDate).toISOString().split('T')[0]}); 
        const cookie = this.props.cookies;
        cookie.set('currentGradeLevel', body.currentGradeLevel);
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
        const response = await fetch('/api/users/' + this.props.cookies.get('id') + '/saveProfile', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',  //receiving data in JSON format in browser
                'Content-Type': 'application/json'  //sending data in JSON format
            },
            body: formJSON
        });
        const body = await response.json();
        this.setState({user: body});
        this.setState({totalTime: body.totalTime});
        this.setState({userGradeLevel: body.currentGradeLevel});
        this.setState({mpEndDate: new Date(body.markingPeriodEndDate).toISOString().split('T')[0]}); 
        const cookie = this.props.cookies;
        cookie.set('currentGradeLevel', body.currentGradeLevel);
      }

    
    render() {
        const headerStyle = {
            height: "100%", 
            borderRadius: ".3rem"
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
        const defaultMpDate = this.state.mpEndDate == '1970-01-01' ? new Date().toISOString().split('T')[0] : this.state.mpEndDate;        
        return(
            <div className="ml-3 mr-3" style={{height: "100%"}}>
                <Row style={headerStyle} className={style('header')}>
                        <Col xs={1} style={{}}>
                            <img className="pt-1 pl-3" src={logo} style={{resizeMode: 'contain', height: "85px"}}/>
                        </Col>
                        <Col xs={5} className="pl-5">
                            <Row><h1 className="ml-3">Daily Planner</h1></Row>
                            <Row>
                                <h4 className="ml-3">{this.state.date} | MP {this.state.user.markingPeriodName} | {this.state.time}</h4>
                            </Row>
                        </Col>
                        <Col xs={4} className="p-3" style={{height: "100%"}}><Button style={{height: "100%"}} color="primary" onClick={this.switchFadeInState}><h6>Study Time Today: {this.state.totalTime}</h6></Button></Col>
                        <Col xs={2}>
                            <div className="col-3"></div>
                            <div className="h-100 col-5 p-0" style={{textAlign: "center"}} id="profilePopover">
                            <ButtonGroup className="p-1">
                                <ButtonGroup vertical id="profilePopover">
                                    <Button type="button" id="profilePopover" color="secondary" style={{height: "93%", width: "100%"}} onClick={this.toggle}>
                                        <h6>Profile</h6>
                                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggle}>
                                        <Form onSubmit={this.handleSubmit}>
                                        <ModalHeader>Profile</ModalHeader>
                                        <ModalBody>
                                            <FormGroup>
                                            <Label for="currentGradeLevel">Grade Level</Label>
                                            <Input type="select" id="currentGradeLevel" name="currentGradeLevel" defaultValue={this.state.userGradeLevel}>
                                                <option value="" disabled selected>Select Grade Level</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                            </Input>
                                            </FormGroup>
                                            <FormGroup>
                                            <Label for="markingPeriodName">Marking Period</Label>
                                            <Input type="select" id="markingPeriodName" name="markingPeriodName" defaultValue={this.state.user.markingPeriodName}>
                                                <option value="" disabled selected>Select Marking Period</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </Input>
                                            </FormGroup>
                                            <FormGroup>
                                            <Label for="markingPeriodEndDate">Marking Period End Date</Label>
                                            <Input type="date" id="markingPeriodEndDate" name="markingPeriodEndDate" defaultValue={defaultMpDate}>
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
                                    <Button type="button" color="dark" style={{height: "93%", width: "100%"}} onClick={this.openSetting}><h6>Settings</h6></Button>
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
                    <SettingsModal isOpen={this.state.isSettingOpen} onClose={this.closeSetting}/>
            </div>
        );
    }
}

export default withCookies(withRouter(HomePageHeader));