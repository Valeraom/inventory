import { ForwardedRef, forwardRef, useState } from 'react';
import { PrimaryButton } from '../PrimaryButton';
import { PrimaryButtonTypes } from '../../enums';

import './ModalAddingProduct.scss';
import { ProductAddingForm } from '../ProductAddingForm';
import { Order, Product } from '../../types';
import { getNewId } from '../../utils/getNewId';
import { useOrders } from '../../hooks/useOrders';

interface Props {
  onClose: () => void;
  order: Order;
}

export const ModalAddingProduct = forwardRef<HTMLDivElement, Props>(
  ({ onClose, order }, ref: ForwardedRef<HTMLDivElement>) => {
    const { id, date, products } = order;
    const [isOpenProductForm, setIsOpenProductForm] = useState<boolean>(false);
    const [newProducts, setNewProducts] = useState<Product[]>([]);

    const { onAddProducts } = useOrders();

    const handleAddProduct = (
      product: Omit<Product, 'id' | 'date' | 'order'>,
    ) => {
      const newProduct: Product = {
        ...product,
        id: getNewId(products),
        date: date,
        order: id,
      };

      setNewProducts(prev => [...prev, newProduct]);
    };

    const handleAddAllProducts = () => {
      onAddProducts(order.id, newProducts);
      setNewProducts([]);
      onClose();
    };

    return (
      <div ref={ref} className="modal fade center" tabIndex={-1} role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Добавить товары</h5>
            </div>

            <div className="modal-body">
              <div className="modal-new-products">
                <h4 className="modal-new-products__title">Новые товары</h4>

                {newProducts.length === 0 ? (
                  <p className="modal-new-products__label">
                    Новых товаров еще нет
                  </p>
                ) : (
                  <ul className="modal-new-products__list">
                    {newProducts.map(product => (
                      <div className="modal-new-products__item">
                        <div className="product-item-short__indicator me-3"></div>

                        <img
                          src={product.photo}
                          alt="Фото продукта"
                          className="product-item-short__photo me-3"
                        />

                        <div className="product-item-short__main-info me-5">
                          <h4 className="product-item-short__title">
                            {product.title}
                          </h4>

                          <p className="product-item-short__serial-num">
                            {product.serialNumber}
                          </p>
                        </div>
                      </div>
                    ))}
                  </ul>
                )}
              </div>

              <div className="modal-add-form">
                <div className="modal-add-form__product-form">
                  {isOpenProductForm ? (
                    <ProductAddingForm
                      onAdd={handleAddProduct}
                      onCloseProductForm={() => setIsOpenProductForm(false)}
                    />
                  ) : (
                    <button
                      className="modal-add-form__add-product"
                      onClick={() => setIsOpenProductForm(true)}
                    >
                      Добавить товар
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="modal__cancel-btn"
                onClick={onClose}
              >
                Отменить
              </button>

              <button
                type="button"
                className="modal__add-btn"
                onClick={handleAddAllProducts}
              >
                <p>Добавить</p>
              </button>
            </div>

            <div className="modal__close">
              <PrimaryButton
                type={PrimaryButtonTypes.BUTTON}
                className="close"
                onClick={onClose}
              >
                <span aria-hidden="true" className="order-info__close-icon">
                  &times;
                </span>
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
