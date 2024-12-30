import { Currency } from '../enums';
import { Product } from '../types';

export const getProductsTotalPrice = (
  products: Product[],
  currency: Currency,
) => {
  return products.reduce((acc, product) => {
    const priceValue =
      currency === Currency.USD
        ? product.price[0].value
        : product.price[1].value;

    return acc + priceValue;
  }, 0);
};
