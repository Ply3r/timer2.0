import eternalYoungMusic from './musicas/eternal-youth.mp3';
import eternalYoungImg from './fotos/eternal-young.png';
import wheniseeyouMusic from './musicas/wheniseeyou.mp3';
import wheniseeyouImg from './fotos/wheniseeyou.png';
import dreamOfHerMusic from './musicas/dream-of-her.mp3';
import dreamOfHerImg from './fotos/dream-of-her.png';
import leavesMusic from './musicas/leaves.mp3';
import leavesImg from './fotos/leaves.png';
import alarm from './musicas/alarm.mp3';

const musics = { 
  eternalYoung: { song: eternalYoungMusic, img: eternalYoungImg, name: 'Eternal-young', artist: 'RUDE' },
  wheniseeyou: { song: wheniseeyouMusic, img: wheniseeyouImg, name: 'When I see You', artist: 'Kudasai' },
  dreamOfHerMusic: { song: dreamOfHerMusic, img: dreamOfHerImg, name: 'Dream of Her', artist: 'Kudasai' },
  leaves: { song: leavesMusic, img: leavesImg, name: 'Leaves', artist: 'Taiko' },
  alarm,
};

export default musics;
