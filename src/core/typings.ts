export type Id = string;

export interface IdData {
    id: Id;
}

export interface TrainingData {
    /** Время перед тренировкой */
    beforeTraining: number;
    /** Количество подходов */
    setsCount: number;
    /** Время подхода в секундах */
    setDuration: number;
    /** Количество циклов */
    cycleCount: number;
    /** Время отдыха между повторами */
    restBetweenSets: number;
    /** Время отдыха между циклами */
    restBetweenCycles: number;
    /** Заминка после циклов */
    afterTraining: number;
}

export interface Training extends IdData, TrainingData {
    name?: string;
    description?: string;
}