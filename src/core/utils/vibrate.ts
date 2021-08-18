export const vibrate = (config: number[]) => {
  if (navigator?.vibrate) {
    navigator.vibrate(config);
  }
};
