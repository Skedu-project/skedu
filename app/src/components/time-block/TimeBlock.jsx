import React from 'react';
import { Row, Col, Container, Input } from 'reactstrap'; 
import classNames from 'classnames/bind';
import styles from'./TimeBlock.css';
// const style = classNames.bind(styles);

class TimeBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textColor: ""
    }
    this.updateColor = this.updateColor.bind(this);
  }

  updateColor() {
    if(this.props.color == "bg-warning" || this.props.color == "bg-light") {
        this.setState({textColor: "dark"});
    } else {
        this.setState({textColor: "white"});
    }
  }

  componentDidMount() {
    this.updateColor();
  }

  render() {
    return (
      // <Container style={{marginBottom: "10px", backgroundColor: "whiteSmoke"}}>
      //   <Row style={{border: '1px solid', borderRadius: '7px', height: "8vh"}}>
      //       <Col xs="1" className={this.props.color} style={{ /*width:'20px',*/ borderTopLeftRadius: '7px', borderBottomLeftRadius: '7px'}} />
      //       <Col xs="9" style={{textAlign: 'center'}}>
      //           <h5>{this.props.name}</h5>
      //           <div style={{borderRadius: "2px", backgroundColor: "lightGray"}}><h6 style={{}}>{this.props.goalGrade}%</h6></div>
      //       </Col>
      //   </Row>
      // </Container>
      <Container className="m-0 rounded border border-dark border-2" style={{backgroundColor: "whiteSmoke"}}>
        <Row style={{height: "100%"}}>
          <Col xs={1} className={"p-0 " + this.props.color} style={{textAlign: "left", opacity: "0.85"/*, backgroundColor: "lightGrey"*/}}>
            <Input type="radio" style={{margin: "0%", transform: "scale(2)", padding: '10px', verticalAlign: 'middle', height: '100%', opacity: "0.75", left: "25%"}}/>
          </Col>
          <Col xs={7} className="p-0" style={{height: "100%", textAlign: "center"}}>
            <div>
              <h4 className={"p-2 m-0 text-" + this.state.textColor + " " + this.props.color} style={{opacity: "0.85"}}>{this.props.subject}</h4>
            </div>
          </Col>
          <Col xs={2} className="p-2 border-right border-dark" style={{textAlign: "center", backgroundColor: "white"}}>
            <h5 className="p-0 m-0">{this.props.percent}%</h5>
          </Col>
          <Col xs={2} className="p-2" style={{textAlign: "center"}}>
            <h5 className="p-0 m-0">{this.props.time} min</h5>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default TimeBlock; 
