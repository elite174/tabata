import { writable } from 'svelte/store';

export type SettingsStore = {
  sounds: {
    sounds: boolean;
    vibration: boolean;
  };
};

const initialSettingsStore: SettingsStore = {
  sounds: {
    sounds: true,
    vibration: true
  }
};

export const settingsStore = writable(initialSettingsStore);
