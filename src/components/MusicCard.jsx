import React from "react";
import { useTransition, animated } from 'react-spring';


const MusicCard = ({img, name, artist, showCard}) => {
  const transition = useTransition(showCard, {
    from: { opacity: 0, top: -20 },
    enter: { opacity: 1, top: 50},
    leave: { opacity: 0, top: -20 },
  })

  return (
    <>
      { transition((style, item) => 
          item &&
            <animated.div style={ style } className="card-container">
              <img src={ img } alt="musica" />
              <div className="info-card">
                <h2>{ name }</h2>
                <p>{ artist }</p>
              </div>
            </animated.div>
      )
      }
    </>
  );
}

export default MusicCard;
