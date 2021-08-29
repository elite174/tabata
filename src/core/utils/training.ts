import type { TrainingData } from '../typings';
import { Stage } from '../constants';

type Options = {
  skipStages?: Set<Stage>;
};

export type StageConfig = { stage: Stage; duration: number };

type Output = {
  totalTrainingTime: number;
  pipeline: StageConfig[];
};

export const makeTraining = (
  {
    beforeTraining,
    cycleCount,
    setsCount,
    setDuration,
    restBetweenCycles,
    restBetweenSets,
    afterTraining
  }: TrainingData,
  { skipStages }: Options = {}
): Output => {
  const pipeline: StageConfig[] = [];
  let totalTrainingTime = 0;

  if (!skipStages?.has(Stage.BEFORE_TRAINING) && beforeTraining) {
    pipeline.push({
      stage: Stage.BEFORE_TRAINING,
      duration: beforeTraining
    });

    totalTrainingTime += beforeTraining;
  }

  for (let cycleIndex = 1; cycleIndex <= cycleCount; cycleIndex++) {
    for (let setIndex = 1; setIndex <= setsCount; setIndex++) {
      if (setDuration) {
        pipeline.push({
          stage: Stage.SET,
          duration: setDuration
        });

        totalTrainingTime += setDuration;

        if (restBetweenSets && setIndex < setsCount) {
          pipeline.push({
            stage: Stage.REST,
            duration: restBetweenSets
          });

          totalTrainingTime += restBetweenSets;
        }
      }
    }

    if (restBetweenCycles && cycleIndex < cycleCount) {
      pipeline.push({
        stage: Stage.CYCLE_REST,
        duration: restBetweenCycles
      });

      totalTrainingTime += restBetweenCycles;
    }
  }

  if (!skipStages?.has(Stage.AFTER_TRAINING) && afterTraining) {
    pipeline.push({
      stage: Stage.AFTER_TRAINING,
      duration: afterTraining
    });

    totalTrainingTime += afterTraining;
  }

  return {
    pipeline,
    totalTrainingTime
  };
};
