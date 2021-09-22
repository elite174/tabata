import type { AudioPreset, CommonSound, Sound } from '../interfaces';

import tick from '../sounds/common/tick.mp3';

import { heatherAudioPreset } from './presets/heather';

export enum AudioPresetName {
  Heather = 'Heather'
}

export const presets: Record<AudioPresetName, AudioPreset> = {
  [AudioPresetName.Heather]: heatherAudioPreset
};

export const commonSounds: Record<CommonSound, string> = {
  tick
};

export const controlNames: Sound[] = ['tick', 'last_one', 'rest', 'training_completed', 'work'];
