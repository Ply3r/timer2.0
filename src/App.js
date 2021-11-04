import React, { Component } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ControlPainel from './components/ControlPainel';
import MusicsPlaylist from './components/MusicsPlaylist';
import { MdMusicNote, MdMusicOff } from 'react-icons/md';
import musics from './songs';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: '5',
      seconds: '0',
      percentage: 0,
      isTimerActive: false,
      alarm: false,
      muted: false,
    }
  }

  startCountdown = () => {
    const { minutes, seconds } = this.state;
    const totalPercentage = Number(minutes) * 60 + Number(seconds);
    const titleHTML = document.getElementById('title');

    this.setState({ isTimerActive: true, alarm: false })
    this.timer = setInterval(() => {
      const { minutes, seconds } = this.state;
      let newMinute = Number(minutes);
      let newSecond = Number(seconds) - 1;

      if (newSecond <= 0 && newMinute !== 0) {
        newMinute -= 1;
        newSecond = 59;
      }

      const calcPercentage = ((totalPercentage - (newMinute * 60 + newSecond)) / totalPercentage) * 100
      const percentage = Math.floor(calcPercentage * 10) / 10;

      const minuteStr = `${newMinute}`
      const secondStr = `${newSecond}`

      titleHTML.innerText = `${'00'.slice(minuteStr.length) + minuteStr}:${'00'.slice(secondStr.length) + secondStr} - Timer`
      this.setState({ minutes: minuteStr, seconds: secondStr, percentage})

      if (newMinute === 0 && newSecond === 0) {
        this.countDownFinish();
        return;
      }

    }, 1000)
  }

  countDownFinish = () => {
    this.setState({ isTimerActive: false, alarm: true })
    clearInterval(this.timer);
    setTimeout(() => {
      alert('The Countdown is over!')
    }, 1000)
  }

  pauseTimer = () => {
    this.setState({ isTimerActive: false })
    clearInterval(this.timer)
  }

  stopTimer = () => {
    const titleHTML = document.getElementById('title');
    titleHTML.innerText = `05:00 - Timer`
    this.setState({ isTimerActive: false, minutes: '5', seconds: '0', percentage: 0, alarm: false, })
    clearInterval(this.timer)
  }

  addQuantity = (min) => {
    const { minutes, seconds } = this.state;
    let newMinute = Number(minutes) + min;
    let newSecond = seconds

    if (newMinute >= 60) {
      newMinute = 59
      newSecond = 59
    }

    this.setState({ minutes: `${newMinute}`, seconds: `${newSecond}` });
  }

  changeTimeBySearch = (value) => {
    const array = value.split(':');
    let minutes = array[0];
    let seconds = array[1];

    this.setState({ minutes, seconds })
  }

  muteAudio = () => {
    this.setState((after) => ({ muted: !after.muted }))
  }

  render() {
    const { percentage, minutes, seconds, isTimerActive, alarm, muted } = this.state;
    return (
      <>
        { alarm && <audio src={ musics.alarm } autoPlay /> }
        { (isTimerActive && !muted) && <MusicsPlaylist /> }
        <button 
          className="mute-button"
          onClick={ this.muteAudio }
        >
          { muted
          ?
            <MdMusicOff />
          :
            <MdMusicNote />
          }
        </button>
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
            changeTimeBySearch={ this.changeTimeBySearch }
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