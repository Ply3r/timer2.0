import { useTransition, animated } from "react-spring";
import musics from '../songs';


const MusicPanel = ({ panelActive, activeMusic, changeActiveMusic }) => {
  const current = musics.find((music) => music.name === activeMusic)
  
  const transition = useTransition(panelActive, {
    from: { left: -550, opacity: 0 },
    enter: { left: -450, opacity: 1 },
    leave: { left: -700, opacity: 0 },
  })

  const elements = musics.map(({ name, artist, img }) => (
    <div className={`flex-item ${current.name === name && 'active'}`} onClick={ () => {
      changeActiveMusic(name);
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

export default MusicPanel;
