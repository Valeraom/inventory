import { ProductSpecification, ProductTypes } from '../enums';
import { Product } from '../types';

type QueryType = {
  searchQuery: string;
  typeQuery: string;
  specificationQuery: string;
};

export const getPreparedProducts = (
  products: Product[],
  { searchQuery, typeQuery, specificationQuery }: QueryType,
) => {
  let preparedProducts = [...products];

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  if (normalizedSearchQuery) {
    preparedProducts = preparedProducts.filter(product => {
      const normalizedTitle = product.title.toLowerCase();

      return normalizedTitle.includes(normalizedSearchQuery);
    });
  }

  if (typeQuery !== ProductTypes.ALL) {
    preparedProducts = preparedProducts.filter(
      product => product.type === typeQuery,
    );
  }

  if (specificationQuery !== ProductSpecification.ALL) {
    preparedProducts = preparedProducts.filter(
      product => product.specification === specificationQuery,
    );
  }

  return preparedProducts;
};
