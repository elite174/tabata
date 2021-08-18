import type { Stage } from '$constants';

interface I18N {
  stages: Record<Stage, string>;
}

export const i18n: I18N = {
  stages: {
    BEFORE_TRAINING: 'Prepare',
    AFTER_TRAINING: 'Rest',
    CYCLE_REST: 'Rest',
    REST: 'Rest',
    SET: 'Work'
  }
};
