import React, { Component } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ControlPainel from './ControlPainel';
import { connect } from 'react-redux';
import { alarmActive, changeTime, timerActive } from '../action';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: 0
    }
  }

  startCountdown = () => {
    const { timerActive, alarmActive, changeTime } = this.props;
    const { minutes, seconds } = this.props;
    const titleHTML = document.getElementById('title');

    const totalPercentage = Number(minutes) * 60 + Number(seconds);

    timerActive(true);
    alarmActive(false);
    
    this.timer = setInterval(() => {
      const { minutes, seconds } = this.props;
      let newMinute = Number(minutes);
      let newSecond = Number(seconds) - 1;

      if (newSecond < 0 && newMinute !== 0) {
        newMinute -= 1;
        newSecond = 59;
      }

      const calcPercentage = ((totalPercentage - (newMinute * 60 + newSecond)) / totalPercentage) * 100
      const percentage = Math.floor(calcPercentage * 10) / 10;

      const minuteStr = `${newMinute}`
      const secondStr = `${newSecond}`

      titleHTML.innerText = `${'00'.slice(minuteStr.length) + minuteStr}:${'00'.slice(secondStr.length) + secondStr} - Timer`

      changeTime(minuteStr, secondStr)
      this.setState({ percentage })

      if (newMinute === 0 && newSecond === 0) {
        this.countDownFinish();
        return;
      }

    }, 1000)
  }

  countDownFinish = () => {
    const { timerActive, alarmActive } = this.props;

    timerActive(false);
    alarmActive(true);
    clearInterval(this.timer);

    setTimeout(() => {
      alert('The Countdown is over!')
      this.stopTimer();
    }, 1000)
  }

  pauseTimer = () => {
    const { timerActive } = this.props;
    timerActive(false);
    clearInterval(this.timer);
  }

  stopTimer = () => {
    const { timerActive, alarmActive, changeTime } = this.props;
    const titleHTML = document.getElementById('title');

    titleHTML.innerText = `05:00 - Timer`;

    this.setState({ percentage: 0 });
    changeTime('05', '00')
    timerActive(false);
    alarmActive(false);

    clearInterval(this.timer)
  }

  addQuantity = (min) => {
    const { minutes, seconds, changeTime } = this.props;
    let newMinute = Number(minutes) + min;
    let newSecond = seconds

    if (newMinute >= 60) {
      newMinute = 59
      newSecond = 59
    }

    changeTime(`${newMinute}`, `${newSecond}`)
  }

  render() {
    const { isTimerActive, minutes, seconds } = this.props;
    const { percentage } = this.state;
    return (
      <>
        <div className="progressbar">
          <CircularProgressbar 
          value={ percentage } 
          strokeWidth={ 4 }
          styles={buildStyles({
            pathColor: '#6f2da8',
            trailColor: '#292929',
          })}
          />
        </div>
        <div className="timer-container">
          <h1 className="hero-title">Timer</h1>
          <div className="time-container">
            <h1>
              {`${'00'.slice(minutes.length) + minutes}:${'00'.slice(seconds.length) + seconds}`}
            </h1>
          </div>
          <ControlPainel 
            isTimerActive={ isTimerActive }
            pauseTimer={ this.pauseTimer }
            startCountdown={ this.startCountdown }
            stopTimer={ this.stopTimer }
            addQuantity={ this.addQuantity }
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ timeReducer: { isTimerActive, minutes, seconds } }) => ({ isTimerActive, minutes, seconds })

const mapDispatchToProps = (dispatch) => ({
  timerActive: (bool) => dispatch(timerActive(bool)),
  alarmActive: (bool) => dispatch(alarmActive(bool)),
  changeTime: (minutes, seconds) => dispatch(changeTime(minutes, seconds)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Timer)
