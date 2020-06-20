// date - 2020/12/12; time - 13:00
export const buildNiticationDate = (date: string, time: string): Date => {
  const userNotification = new Date(date);
  userNotification.setHours(Number(time.split(':')[0]));

  return userNotification;
};
