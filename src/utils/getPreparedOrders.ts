import { Order } from '../types';

type QueryType = {
  searchQuery: string;
};

export const getPreparedOrders = (
  orders: Order[],
  { searchQuery }: QueryType,
) => {
  let preparedProducts = [...orders];

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  if (normalizedSearchQuery) {
    preparedProducts = preparedProducts.filter(product => {
      const normalizedTitle = product.title.toLowerCase();

      return normalizedTitle.includes(normalizedSearchQuery);
    });
  }

  return preparedProducts;
};
