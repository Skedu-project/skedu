import React from 'react'; 
import LoginAccount from '../login-account/LogInAccount';
import CreateAccount from '../CreateAccount'; 
import { Container, Row, Col } from 'reactstrap'; 
import classNames from 'classnames/bind'; 
import styles from './LoginPage.css'; 

const cx = classNames.bind(styles);

class LoginPage extends React.Component {

    constructor(props){
        super(props);
    }

    render() {

        return(
        <div>
            <Container className={cx('ca')} > 
                <Row xs="2" style={{margin:"0px"}}>
                    <Col><div><LoginAccount /></div></Col>
                    <Col><div className={cx('hehe')} style={{backgroundColor:"lightgray", padding: "30px"}}><CreateAccount /></div></Col>
                </Row>
            </Container>
        </div>
        )
    }
}

export default LoginPage; 