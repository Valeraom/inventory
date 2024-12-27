export const getFormattedTime = (time: number) => {
  return time.toString().padStart(2, '0');
};
