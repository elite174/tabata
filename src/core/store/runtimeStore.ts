import { writable } from 'svelte/store';

import type { TrainingData } from '../typings';

const currentTrainingConfig = writable<TrainingData | null>(null);

export const runtimeStore = {
  currentTrainingConfig
};

export type RuntimeStore = typeof runtimeStore;
