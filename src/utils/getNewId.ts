import { Order, Product } from '../types';

export const getNewId = (dataObj: Order[] | Product[]) => {
  const newId =
    dataObj.length === 0 ? 1 : Math.max(...dataObj.map(item => item.id)) + 1;

  return newId;
};
