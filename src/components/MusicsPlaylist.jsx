import React, { Component } from "react";
import { connect } from "react-redux";
import { activeMusic } from "../action";
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
    this.getActiveMusic();
    this.apagarCard();
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

  changeMusic = () => {
    const { activeMusic, activeMusicChange, shuffle } = this.props;
    const index = musics.findIndex((music) => music.name === activeMusic);
    let newMusic;
    if (shuffle) {
      let sortedIndex = Math.floor(Math.random() * musics.length - 1)

      if (activeMusic !== musics[sortedIndex].name) {
        newMusic = musics[sortedIndex].name

      } else {
        let nextIndex = sortedIndex + 1

        if (nextIndex > musics.length - 1) {
          newMusic = musics[sortedIndex - 1].name

        } else {
          newMusic = musics[sortedIndex + 1].name
        }
      }

    } else {
      let newIndex = index + 1;
      if(newIndex > musics.length - 1) {
        newIndex = 0
      }

      newMusic = musics[newIndex].name
    }

    activeMusicChange(newMusic);
  }

  render() {
    const { img, name, artist, song, showCard } = this.state;
    return (
      <>
        <MusicCard 
          img={ img }
          name={ name }
          artist={ artist }
          showCard={ showCard }
        />
        <audio onEnded={this.changeMusic} src={ song } autoPlay />
      </>
    )
  }
}

const mapStateToProps = ({ controlReducer: { activeMusic, shuffle } }) => ({ activeMusic, shuffle })

const mapDispatchToProps = (dispatch) => ({
  activeMusicChange: (name) => dispatch(activeMusic(name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MusicsPlaylist);
