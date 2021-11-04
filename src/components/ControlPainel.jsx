import React, { Component } from "react";
import { BsPlayFill, BsPauseFill, BsStopFill } from "react-icons/bs";
import { FaSearch } from 'react-icons/fa';

class ControlPainel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textSearch: '',
      search: false,
    }
  }

  handleChange = ({ target: { value } }) => {
    const regex = /^[\d]{2}$/

    if (regex.test(value)) {
      value += ':'
    }

    if (value.length <= 5) {
      this.setState({ textSearch: value })
    }

  }

  searchEnter = (event) => {
    const { textSearch } = this.state;
    const { changeTimeBySearch } = this.props;
    const ENTER_KEYCODE = 13;
    const regex = /^\d{2}:\d{2}$/s
       
    if (event.keyCode === ENTER_KEYCODE && regex.test(textSearch)) {
      changeTimeBySearch(textSearch)
    }
    
  }

  togleSearch = () => {
    this.setState((after) => ({ search: !after.search }))
  }

  render() {
    const { search, textSearch } = this.state;
    const { 
      isTimerActive,
      pauseTimer,
      startCountdown,
      stopTimer,
      addQuantity,
    } = this.props;
    return (
      <>
        <div className="control-painel">
          { isTimerActive 
          ? 
            <button
              onClick={ pauseTimer }
            >
              <BsPauseFill />
            </button>
          :
            <button
              onClick={ startCountdown }
            >
              <BsPlayFill />
            </button>
          }
          <button
            onClick={ stopTimer }
          >
            <BsStopFill />
          </button>
          <button
            disabled={ isTimerActive }
            onClick={() => {
              addQuantity(5)
            }}
          >
            +5
          </button>
          <button
            disabled={ isTimerActive }
            onClick={() => {
              addQuantity(10)
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
    </>
    );
  }
}

export default ControlPainel;
