import React, { Component } from "react";
import musics from "../songs";
import MusicCard from "./MusicCard";

class MusicsPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: '',
      name: '',
      artist: '',
      song: '',
      showCard: true,
    }
  }

  componentDidMount() {
    this.apagarCard();
    this.getActiveMusic();
  }

  componentDidUpdate(Props) {
    const { activeMusic } = this.props;
    if(Props.activeMusic !== activeMusic) {
      this.getActiveMusic();
      this.apagarCard();
    }
  }

  apagarCard = () => {
    setTimeout(() => {
      this.setState({ showCard: false })
    }, 6000)
  }

  getActiveMusic = () => {
    const { activeMusic } = this.props;
    const { name, img, artist, song } = musics.find((musica) => musica.name === activeMusic)
    this.setState({ name, img, artist, song, showCard: true })
  }

  render() {
    const { img, name, artist, song, showCard } = this.state;
    const { changeMusic } = this.props;
    return (
      <>
        <MusicCard 
          img={ img }
          name={ name }
          artist={ artist }
          showCard={ showCard }
        />
        <audio onEnded={changeMusic} src={ song } autoPlay />
      </>
    )
  }
}

export default MusicsPlaylist;
