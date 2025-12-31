export const calcRemainingTime = (date: Date) => {
  //menos 3 horas da hora atual e retorna o timestamp em milissegundos
  const now = new Date();
  now.setHours(now.getHours() - 3);
  const nowTimestamp = now.getTime();
  const targetDate = new Date(date).getTime();
  const timeRemaining = Math.max(targetDate - nowTimestamp, 0);
  return timeRemaining;
};
