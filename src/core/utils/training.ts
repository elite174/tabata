import type { TrainingData } from '../typings';
import { Stage } from '../constants';

interface TimerState {
  stage: Stage | null;
  nextStage?: Stage | null;
  timeRemained: number;
  cyclesRemained?: number;
  setsRemained?: number;
  finished?: boolean;
}

export type TimerGenerator = Generator<TimerState, TimerState, TimerState>;

export function* getNextState(config: TrainingData): TimerGenerator {
  let timeRemained: number;

  for (timeRemained = config.beforeTraining; timeRemained >= 0; timeRemained--) {
    yield { stage: Stage.BEFORE_TRAINING, timeRemained, nextStage: Stage.SET };
  }

  for (let cyclesRemained = config.cycleCount - 1; cyclesRemained >= 0; cyclesRemained--) {
    for (let setsRemained = config.setsCount - 1; setsRemained >= 0; setsRemained--) {
      for (timeRemained = config.setDuration; timeRemained >= 0; timeRemained--) {
        yield {
          stage: Stage.SET,
          cyclesRemained,
          setsRemained,
          timeRemained
        };
      }

      if (setsRemained > 0) {
        for (timeRemained = config.restBetweenSets; timeRemained >= 0; timeRemained--) {
          yield {
            stage: Stage.REST,
            timeRemained
          };
        }
      }
    }

    if (cyclesRemained > 0) {
      for (timeRemained = config.restBetweenCycles; timeRemained >= 0; timeRemained--) {
        yield {
          stage: Stage.CYCLE_REST,
          timeRemained
        };
      }
    }
  }

  for (timeRemained = config.afterTraining; timeRemained >= 1; timeRemained--) {
    yield {
      stage: Stage.AFTER_TRAINING,
      timeRemained
    };
  }

  return {
    stage: Stage.AFTER_TRAINING,
    timeRemained: 0
  };
}
