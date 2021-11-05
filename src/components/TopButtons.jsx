import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MdMusicNote, MdMusicOff } from 'react-icons/md';
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from 'react-icons/ai'
import { isMuted, panelActive } from '../action';

class TopButtons extends Component {
  muteAudio = () => {
    const { muted, isMuted } = this.props;
    isMuted(!muted);
  }

  showPainel = () => {
    const { panelActive, panelActiveChange } = this.props;
    panelActiveChange(!panelActive);
  }

  render() {
    const { muted, panelActive } = this.props;
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
      </>
    );
  }
}

const mapStateToProps = ({ controlReducer: { muted, panelActive } }) => ({ panelActive, muted });

const mapDispatchToProps = (dispatch) => ({
  isMuted: (bool) => dispatch(isMuted(bool)),
  panelActiveChange: (bool) => dispatch(panelActive(bool)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TopButtons);
