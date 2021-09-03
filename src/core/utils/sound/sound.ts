import defaultTick from './assets/default/tick.mp3';
import defaultStage from './assets/default/stage.mp3';
import defaultEnd from './assets/default/end.mp3';

export type Sound = 'tick' | 'end' | 'stage';

const sounds = {
  tick: defaultTick,
  stage: defaultStage,
  end: defaultEnd
};

export const play = (player: HTMLAudioElement, sound: Sound) => {
  player.pause();
  player.src = sounds[sound];
  player.play();
};
