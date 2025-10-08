// Attemps management
export interface IAttempts {
  count: number;
  firstTry: number;
}

export const MAX_TRIES = 3;
export const COOLDOWN = 15 * 60 * 1000;
export const STORAGE_KEY = "pxl_attempts";

export const getAttempts = (): IAttempts => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : { count: 0, firstTry: 0 };
};

export const saveAttempts = (attempts: IAttempts) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
};

export const resetAttempts = () => {
  saveAttempts({ count: 0, firstTry: 0 });
};

export const getTimeUntilNextTry = (): number => {
  const attempts = getAttempts();
  if (!attempts.firstTry || attempts.count < MAX_TRIES) return 0;

  const timePassed = Date.now() - attempts.firstTry;
  const timeRemaining = COOLDOWN - timePassed;

  return Math.max(0, Math.ceil(timeRemaining / 1000));
};
