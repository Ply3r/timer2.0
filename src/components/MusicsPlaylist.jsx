import React, { Component } from "react";
import musics from '../songs';
import MusicCard from "./MusicCard";

class MusicsPlaylist extends Component {
  constructor(props) {
    super(props);
    const MusicPlaylist = [
      musics.dreamOfHerMusic, 
      musics.wheniseeyou, 
      musics.eternalYoung, 
      musics.leaves
    ];
    const playlist = MusicPlaylist.sort(() => Math.random() - 0.5 )
    this.state = {
      playlist,
      position: 0,
      showCard: true,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showCard: false })
    }, 6000)
  }

  changeMusic = () => {
    const { position, playlist: { length } } = this.state;
    let newPosition = position + 1;
    if (newPosition >= length - 1) {
      newPosition = 0
    }
    this.setState({ position: newPosition, showCard: true });
    setTimeout(() => {
      this.setState({ showCard: false })
    }, 6000)
  }

  render() {
    const { playlist, position, showCard } = this.state;
    return (
      <>
        <MusicCard 
          img={ playlist[position].img }
          name={ playlist[position].name }
          artist={ playlist[position].artist }
          showCard={ showCard }
        />
        <audio onEnded={this.changeMusic} src={ playlist[position].song } autoPlay />
      </>
    )
  }
}

export default MusicsPlaylist;
