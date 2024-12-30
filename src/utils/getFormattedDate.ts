import { months } from '../constants';

export const getFormattedDate = (fullDate: string) => {
  const date = fullDate.split(' ')[0].split('-');
  const year = date[0];
  const month = months[Number(date[1].replace('0', '')) - 1];
  const day = date[2].replace('0', '');

  return `${day} / ${month} / ${year}`;
};
