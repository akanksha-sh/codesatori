import React from "react";
import moment from "moment";

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
    const { days, hours, minutes, seconds } = this.state;
    const CountdownBoxStyle = this.props.countdownBoxStyle;

    return (
      <div>
        <div style={CountdownBoxStyle}>
          <div style={CountdownItemStyle}>
            {days}
            <span>days</span>
          </div>
          <div style={CountdownItemStyle}>
            {hours}
            <span>hours</span>
          </div>
          <div style={CountdownItemStyle}>
            {minutes}
            <span>minutes</span>
          </div>
          <div style={CountdownItemStyle}>
            {seconds}
            <span>seconds</span>
          </div>
        </div>
      </div>
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
