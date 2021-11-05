import React, { Component } from "react";
import { BsPlayFill, BsPauseFill, BsStopFill } from "react-icons/bs";
import { FaSearch } from 'react-icons/fa';
import Search from "./Search";

class ControlPainel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
    }
  }

  togleSearch = () => {
    this.setState((after) => ({ search: !after.search }))
  }

  render() {
    const { search } = this.state;
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
        <Search search={ search } />
    </>
    );
  }
}

export default ControlPainel;
