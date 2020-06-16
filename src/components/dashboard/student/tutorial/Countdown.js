import React from "react";
import moment from "moment";
import { Alert } from "reactstrap";

class Countdown extends React.Component {
  state = {
    days: undefined,
    hours: undefined,
    minutes: undefined,
    seconds: undefined,
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      const { deadline } = this.props;
      const then = moment(deadline);
      const now = moment();
      const countdown = moment(then - now);
      const days = countdown.format("D");
      const hours = countdown.format("HH");
      const minutes = countdown.format("mm");
      const seconds = countdown.format("ss");

      this.setState({ days, hours, minutes, seconds });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    const { days, hours, minutes } = this.state;
    const CountdownBoxStyle = this.props.countdownBoxStyle;

    return (
      <Alert
        style={{
          ...CountdownBoxStyle,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <div style={{ float: "left" }}>Time left: </div>
        <em style={{ float: "right" }}>
          {days} days {hours} hours {minutes} minutes{" "}
        </em>
      </Alert>
    );
  }
}

export default Countdown;

const CountdownItemStyle = {
  fontSize: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  margin: "3px",
  position: "relative",
  height: "20px",
};
