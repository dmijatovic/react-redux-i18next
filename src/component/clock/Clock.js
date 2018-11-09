import React from 'react';

import './Clock.scss';

export class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.initState();
  }
  initState() {
    //eslint-disable-next-line
    this.state={
      time: {
        hrs: '00',
        min: '00',
      },
      update: 1000,
      semicolon: true,
    };
  }
  componentDidMount() {
    //set clock update interval
    this.timerId = setInterval(() => {
      this.tick();
    }, this.state.update);
  }
  componentWillUnmount() {
    //remove timer
    clearInterval(this.timerId);
  }
  tick() {
    //console.log("Update time...");
    //debugger
    let time = new Date(),
      hrs = time.getHours(),
      min = time.getMinutes();

    this.setState({
      time: {
        hrs: this.formatShortNumToStr(hrs),
        min: this.formatShortNumToStr(min),
      },
      //toggle visibility
      semicolon: !this.state.semicolon,
    });
  }
  /**
   * Format time number to a string value having always width of 2,
   *
   * @param {*} num
   */
  formatShortNumToStr(num) {
    let strNum = '00';
    if (num < 10) {
      strNum = `0${num}`;
    } else {
      strNum = num.toString();
    }
    return strNum;
  }
  showSemicolon() {
    if (this.state.semicolon) {
      //show semicolon
      return <div className="app-clock-semicol">:</div>;
    } else {
      //hide semicolon
      return <div className="app-clock-semicol" />;
    }
  }
  render() {
    return (
      <time className="app-clock">
        <div className="app-clock-hours">
          {this.state.time.hrs}
        </div>
        {//show/hide semicolon on each interval
        this.showSemicolon()}
        <div className="app-clock-minutes">
          {this.state.time.min}
        </div>
      </time>
    );
  }
}

export default Clock;
