import { connect } from "react-redux";
import { useTransition, animated } from "react-spring";
import { activeMusic } from '../action';
import musics from '../songs';


const MusicPanel = ({ panelActive, activeMusic, activeMusicChange }) => {
  const current = musics.find((music) => music.name === activeMusic)
  
  const transition = useTransition(panelActive, {
    from: { left: -550, opacity: 0 },
    enter: { left: -450, opacity: 1 },
    leave: { left: -700, opacity: 0 },
  })

  const elements = musics.map(({ name, artist, img }) => (
    <div className={`flex-item ${current.name === name && 'active'}`} onClick={ () => {
      activeMusicChange(name);
    } }>
      <img src={ img } alt="capa" />
      <h3>{ name }</h3>
      <p>{ artist }</p>
    </div>
  ));
  
  return (
    <>
      { transition((style, item) => 
        item &&
          <animated.div style={ style } className="music-panel">
            <div className="main-painel-container">
              <img src={ current.img } alt="imagem-selecionada" />
              <h2>{ current.name }</h2>
              <h3>{ current.artist }</h3>
            </div>
            <div className="flex-container">
              { elements }
            </div>
          </animated.div>
      ) }
    </>
  );
}

const mapStateToProps = ({ controlReducer: { activeMusic, panelActive } }) => ({ activeMusic, panelActive })

const mapDispatchToProps = (dispatch) => ({
  activeMusicChange: (name) => dispatch(activeMusic(name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MusicPanel);
