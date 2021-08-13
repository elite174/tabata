import { writable } from 'svelte/store';
import type { TrainingData } from '../typings';

const currentTrainingConfig = writable<TrainingData | null>(null);

export const store = {
  currentTrainingConfig
};

export type Store = typeof store;