type WakeLock = {
  release: () => Promise<void>;
};

export const lockScreen = async (): Promise<null | VoidFunction> => {
  if (!('wakeLock' in navigator)) return null;

  let wakeLock: WakeLock | null = null;

  try {
    wakeLock = await (navigator as any).wakeLock.request('screen');
  } catch (err) {
    // the wake lock request fails - usually system related, such being low on battery
    console.error(err);
    return null;
  }

  return () => {
    wakeLock?.release().then(() => {
      wakeLock = null;
    });
  };
};
