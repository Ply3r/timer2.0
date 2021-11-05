import React, { Component } from 'react'
import MusicsPlaylist from './components/MusicsPlaylist';
import MusicPanel from './components/MusicPanel';
import TopButtons from './components/TopButtons';
import Timer from './components/Timer';
import Alarm from './songs/musicas/alarm.mp3'
import { connect } from 'react-redux';

class App extends Component {
  render() {
    const { isTimerActive, alarm, muted } = this.props;
    return (
      <>
        { alarm && <audio src={ Alarm } autoPlay /> }
        { (isTimerActive && !muted) && 
          <MusicsPlaylist /> 
        }
        <TopButtons />
        <MusicPanel />
        <Timer />
      </>
    );
  }
}

const mapStateToProps = (
  { timeReducer: { isTimerActive }, controlReducer: { alarm, muted } }
) => ({ isTimerActive, alarm, muted })

export default connect(mapStateToProps, null)(App);
