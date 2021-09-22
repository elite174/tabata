export type CommonSound = 'tick';

export type PresetSound = 'work' | 'rest' | 'last_one' | 'training_completed';

export type Sound = CommonSound | PresetSound;

export type AudioService = {
  playSound: (sound: Sound) => void;
};

export type AudioPreset = Record<PresetSound, string>;
