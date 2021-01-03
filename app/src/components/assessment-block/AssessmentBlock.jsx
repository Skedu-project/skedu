import React from 'react';
import { withRouter } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { Container, Col, Row, Button, fluid } from 'reactstrap';

class AssessmentBlock extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Container fluid className="border m-0 p-0" >
                <Row>
                    <Col md={8}>
                        <Container  className="pr-0" style={{backgroundColor: this.props.color}}>
                            <Row>
                                <Col md={2} className="p-0"><Button color="secondary">O</Button></Col>
                                <Col className="p-0 m-0"><h5 className="p-0 m-0">{this.props.subject}</h5></Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col style={{textAlign: "center", backgroundColor: "white"}} className="p-0" md={3}><h6>{this.props.date}</h6></Col>
                </Row>
            </Container>
        );
    }
}

export default withCookies(AssessmentBlock);