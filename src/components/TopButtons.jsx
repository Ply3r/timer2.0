import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MdMusicNote, MdMusicOff } from 'react-icons/md';
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from 'react-icons/ai'
import { ImShuffle } from 'react-icons/im';
import { isMuted, panelActive, shuffleChange } from '../action';

class TopButtons extends Component {
  muteAudio = () => {
    const { muted, isMuted } = this.props;
    isMuted(!muted);
  }

  showPainel = () => {
    const { panelActive, panelActiveChange } = this.props;
    panelActiveChange(!panelActive);
  }

  isShuffle = () => {
    const { shuffle, shuffleChange } = this.props;
    shuffleChange(!shuffle);
  }

  render() {
    const { muted, panelActive, shuffle } = this.props;
    return (
      <>
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
        <button 
          className="panel-button"
          onClick={ this.showPainel }
        >
          { panelActive
          ?
            <AiOutlineMenuFold />
          :
            <AiOutlineMenuUnfold />
          }
        </button>
        <button 
          className="shuffle-button"
          onClick={ this.isShuffle }
        >
          { shuffle
          ?
            <div className="white">
              <ImShuffle />
            </div>
          :
            <div className="black">
              <ImShuffle />
            </div>
          }
        </button>
      </>
    );
  }
}

const mapStateToProps = ({ controlReducer: { muted, panelActive, shuffle } }) => ({ panelActive, muted, shuffle });

const mapDispatchToProps = (dispatch) => ({
  isMuted: (bool) => dispatch(isMuted(bool)),
  panelActiveChange: (bool) => dispatch(panelActive(bool)),
  shuffleChange: (bool) => dispatch(shuffleChange(bool)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TopButtons);
