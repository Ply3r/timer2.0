import React, { Component } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { BsPlayFill, BsPauseFill, BsStopFill } from "react-icons/bs";
import { FaSearch } from 'react-icons/fa'
import 'react-circular-progressbar/dist/styles.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: '5',
      seconds: '0',
      percentage: 0,
      isTimerActive: false,
      search: false,
      textSearch: '',
    }
  }

  startCountdown = () => {
    const { minutes, seconds } = this.state;
    const totalPercentage = Number(minutes) * 60 + Number(seconds);
    const titleHTML = document.getElementById('title');

    this.setState({ isTimerActive: true })
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
        this.setState({ isTimerActive: false })
        clearInterval(this.timer);
        alert('The Countdown is over!')
        return;
      }

    }, 1000)
  }

  pauseTimer = () => {
    this.setState({ isTimerActive: false })
    clearInterval(this.timer)
  }

  stopTimer = () => {
    const titleHTML = document.getElementById('title');
    titleHTML.innerText = `05:00 - Timer`
    this.setState({ isTimerActive: false, minutes: '5', seconds: '0', percentage: 0 })
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

  togleSearch = () => {
    this.setState((after) => ({ search: !after.search }))
  }

  changeTimeBySearch = (value) => {
    const array = value.split(':');
    let minutes = array[0];
    let seconds = array[1];

    this.setState({ minutes, seconds })
  }

  handleChange = ({ target: { value } }) => {

    if (value.length === 2) {
      value += ':'
    }

    if (value.length <= 5) {
      this.setState({ textSearch: value })
    }

  }

  searchEnter = (event) => {
    const { textSearch } = this.state;
    const ENTER_KEYCODE = 13;
    const regex = /^\d{2}:\d{2}$/s
       
    if (event.keyCode === ENTER_KEYCODE && regex.test(textSearch)) {
      this.changeTimeBySearch(textSearch)
    }
    
  }

  render() {
    const { percentage, minutes, seconds, isTimerActive, search, textSearch } = this.state;
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
          <div className="control-painel">
            { isTimerActive 
            ? 
              <button
                onClick={ this.pauseTimer }
              >
                <BsPauseFill />
              </button>
            :
              <button
                onClick={ this.startCountdown }
              >
                <BsPlayFill />
              </button>
            }
            <button
              onClick={ this.stopTimer }
            >
              <BsStopFill />
            </button>
            <button
              disabled={ isTimerActive }
              onClick={() => {
                this.addQuantity(5)
              }}
            >
              +5
            </button>
            <button
              disabled={ isTimerActive }
              onClick={() => {
                this.addQuantity(10)
              }}
            >
              +10
            </button>
            <button
              disabled={ isTimerActive }
              onClick={ this.togleSearch }
            >
              <FaSearch />
            </button>
          </div>
          <div className="search-container">
            { search &&

              <input
                type="text"
                name="textSearch"
                value={ textSearch }
                placeholder="00:00"
                onChange={ this.handleChange }
                onKeyUp={ this.searchEnter }
              />
            }
          </div>
        </div>
      </>
    );
  }
}