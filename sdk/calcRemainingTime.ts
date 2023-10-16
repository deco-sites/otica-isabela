export const calcRemainingTime = (date: Date) => {
  const targetDate = new Date(date).getTime();
  const currentTime = new Date().getTime();
  const timeRemaining = Math.max(targetDate - currentTime, 0);

  return timeRemaining;
};
