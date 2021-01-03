import React from 'react';
import { withRouter } from 'react-router-dom';
import { withCookies } from 'react-cookie';

class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const cookies = this.props.cookies;
        const emailCookie = cookies.get('email');
        if(emailCookie) {
            // go to home page
            this.props.history.push('/home');
        } else {
            //go to login page
            this.props.history.push('/login');
        }
        return(
            <div></div>
        );
    }
}

export default withCookies(MainPage);