export const enum Stage {
  BEFORE_TRAINING = 'BEFORE_TRAINING',
  SET = 'SET',
  REST = 'REST',
  CYCLE_REST = 'CYCLE_REST',
  AFTER_TRAINING = 'AFTER_TRAINING'
}

export enum ContextKeys {
  SettingsStore = 'SettingsStore',
  RuntimeStore = 'RuntimeStore',
  VibrateService = 'VibrateService',
  RouterStore = 'RouterStore',
  AudioService = 'AudioService',
  WakeLockService = 'WakeLockService'
}
