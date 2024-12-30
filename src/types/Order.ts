import { Product } from './Product';

export type Order = {
  id: number;
  title: string;
  date: string;
  description: string;
  get products(): Product[];
};
