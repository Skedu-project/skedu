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
        // const backStyle = {
        //     backgroundImage: "url(https://wallpaperaccess.com/full/1236480.jpg)", 
        //     backgroundPosition: 'center',
        //     backgroundSize: 'cover',
        //     backgroundRepeat: 'no-repeat'
        // };

        return(
        <div style={{height: window.innerHeight}}>
            <div className="h-100 d-flex justify-content-center align-items-center">
                <Container className={"container", cx('ca')}> 
                    <div className="row m-0">
                        <Col className="col-5 m-0 p-0"><div><LoginAccount /></div></Col>
                        <Col className="col m-0 p-0"><div className={cx('hehe')} style={{backgroundColor:"lightgray", padding: "30px"}}><CreateAccount /></div></Col>
                    </div>
                </Container>
            </div>
        </div>
        )
    }
}

export default LoginPage; 