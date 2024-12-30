import { useState } from 'react';

import { Order, Product } from '../../types';
import { ProductTypes, ProductSpecification } from '../../enums';
import { ProductItem } from '../../components';
import { getPreparedProducts } from '../../utils';
import { useOrders, useSeacrhQuery } from '../../hooks';

import './ProductsPage.scss';

export const ProductsPage = () => {
  const { orders } = useOrders();
  const { searchQuery } = useSeacrhQuery();

  const [typeParam, setTypeParam] = useState<ProductTypes>(ProductTypes.ALL);
  const [specificationParam, setSpecificationParam] =
    useState<ProductSpecification>(ProductSpecification.ALL);

  const allProducts = orders.reduce<Product[]>((acc, order: Order) => {
    return [...acc, ...order.products];
  }, []);

  const preparedProducts = getPreparedProducts(allProducts, {
    searchQuery: searchQuery.products,
    typeQuery: typeParam,
    specificationQuery: specificationParam,
  });

  return (
    <div className="product-page">
      <div className="product-page__top-section">
        <h1 className="product-page__title">{`Продукты / ${preparedProducts.length}`}</h1>

        <div className="product-page__field">
          <label
            htmlFor="product-page__input-type"
            className="product-page__label"
          >
            Тип:
          </label>

          <select
            id="product-page__input-type"
            className="product-page__input"
            value={typeParam}
            onChange={event =>
              setTypeParam(event.currentTarget.value as ProductTypes)
            }
          >
            <option value={ProductTypes.ALL}>Все</option>
            <option value={ProductTypes.MONITORS}>Мониторы</option>
            <option value={ProductTypes.PHONES}>Смартфоны</option>
            <option value={ProductTypes.TABLETS}>Планшеты</option>
          </select>
        </div>

        <div className="product-page__field">
          <label
            htmlFor="product-page__input-spec"
            className="product-page__label"
          >
            Спецификация:
          </label>

          <select
            id="product-page__input-spec"
            className="product-page__input"
            value={specificationParam}
            onChange={event =>
              setSpecificationParam(
                event.currentTarget.value as ProductSpecification,
              )
            }
          >
            <option value={ProductSpecification.ALL}>Все</option>
            <option value={ProductSpecification.SPECIFICATION1}>
              Спецификация 1
            </option>
            <option value={ProductSpecification.SPECIFICATION2}>
              Спецификация 2
            </option>
            <option value={ProductSpecification.SPECIFICATION3}>
              Спецификация 3
            </option>
          </select>
        </div>
      </div>

      <div className="product-page__products">
        {preparedProducts.length === 0 ? (
          <p>Продуктов нет</p>
        ) : (
          preparedProducts.map(product => <ProductItem product={product} />)
        )}
      </div>
    </div>
  );
};
