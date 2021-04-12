import React from 'react';
import { Row, Col, Container, Input } from 'reactstrap'; 
import classNames from 'classnames/bind';
import styles from'./TimeBlock.css';
import styles2 from '../settings-modal/DarkMode.scss'; 
const style = classNames.bind(styles);
const style2 = classNames.bind(styles2);

class TimeBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textColor: "", 
      checked: false
    }
    this.updateColor = this.updateColor.bind(this);
    this.checkRadio = this.checkRadio.bind(this); 
  }

  updateColor() {
    if(this.props.color == "bg-warning" || this.props.color == "bg-light") {
        this.setState({textColor: "dark"});
    } else {
        this.setState({textColor: "white"});
    }
  }

  checkRadio() {
    if(this.state.checked == true){
      this.setState({checked: false}); 
    } else {
      this.setState({checked: true});
    }
  }

  componentDidMount() {
    this.updateColor();
  }

  componentDidUpdate(prevProps) {
    if ((this.props.length !== prevProps.length) || (this.props.color !== prevProps.color)) {
      this.updateColor();
    }
  }

  render() {
    // const color = this.state.checked == true ? this.state.color : this.props.color; 
    return (
      <Container className="rounded" style={{border: "1px solid"}}>
        <Row style={{height: "100%"}}>
          <Col xs={1} className={"p-0 " + this.props.color} style={{textAlign: "left", opacity: "0.85"/*, backgroundColor: "lightGrey"*/}}>
            <Input type="radio" checked={this.state.checked} onClick={this.checkRadio} style={{margin: "0%", transform: "scale(2)", padding: '10px', verticalAlign: 'middle', height: '100%', opacity: "0.75", left: "25%"}}/>
          </Col>
          <Col xs={7} className="p-0" style={{height: "100%", textAlign: "center"}}>
              <h4 className={"p-2 m-0 text-" + this.state.textColor + " " + this.props.color} style={{opacity: "0.85", height: "100%"}}>{this.props.subject}</h4>
          </Col>
          <Col xs={2} className={"p-2 " + style2('time-block')} style={{textAlign: "center"}}>
            <h5 className={"p-0 m-0"}>{isNaN(this.props.percent) ? `N/A` : `${this.props.percent}%`}</h5>
          </Col>
          <Col xs={2} className={"p-2 " + style2('time-block')} style={{textAlign: "center"}}>
            <h5 className={"p-0 m-0"}>{isNaN(this.props.time) ? `N/A` : `${this.props.time} min`}</h5>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default TimeBlock; 
