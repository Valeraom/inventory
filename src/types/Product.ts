import { ProductTypes } from '../enums';

export type Product = {
  id: number;
  serialNumber: number;
  isNew: number;
  photo: string;
  title: string;
  type: ProductTypes;
  specification: string;
  guarantee: {
    start: string;
    end: string;
  };
  price: {
    value: number;
    symbol: string;
    isDefault: number;
  }[];
  order: number;
  date: string;
};
