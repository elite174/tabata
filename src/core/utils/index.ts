export const pxToRem = (px: number): number => px / 16;

export const formatTime = (seconds: number) =>
  `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;

export class Ref<T> {
  current: T;

  constructor(value: T) {
    this.current = value;
  }
}
