import { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import { PrimaryButton } from '../PrimaryButton';
import { PrimaryButtonTypes } from '../../enums';

import './ModalAddingOrder.scss';
import { ProductAddingForm } from '../ProductAddingForm';
import { Order, Product } from '../../types';
import { getNewId } from '../../utils/getNewId';
import { useOrders } from '../../hooks/useOrders';

interface Props {
  onClose: () => void;
}

export const ModalAddingOrder = forwardRef<HTMLDivElement, Props>(
  ({ onClose }, ref: ForwardedRef<HTMLDivElement>) => {
    const { orders, onAddOrder } = useOrders();

    const [isOpenProductForm, setIsOpenProductForm] = useState<boolean>(false);

    const [orderId, setOrderId] = useState<number>(0);
    const [title, setTitle] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [products, setProducts] = useState<Product[]>([]);

    const handleAddProduct = (
      product: Omit<Product, 'id' | 'date' | 'order'>,
    ) => {
      const newProduct: Product = {
        ...product,
        id: getNewId(products),
        date: date,
        order: orderId,
      };

      setProducts(prev => [...prev, newProduct]);
    };

    const handleAddOrder = () => {
      const newOrder: Order = {
        id: orderId,
        title: title,
        date: date,
        description: description,
        products: products,
      };

      onAddOrder(newOrder);
      onClose();
    };

    useEffect(() => {
      setOrderId(getNewId(orders));
    }, [orders]);

    return (
      <div ref={ref} className="modal fade center" tabIndex={-1} role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Добавить приход</h5>
            </div>

            <div className="modal-body">
              <div className="modal-add-form">
                <div className="modal-add-form__order-form">
                  <div className="modal-add-form__input-container">
                    <label
                      htmlFor="modal-add-form__input-title"
                      className="modal-add-form__label"
                    >
                      Введите название прихода
                    </label>

                    <input
                      id="modal-add-form__input-title"
                      className="modal-add-form__input"
                      name="title"
                      type="text"
                      placeholder="Название"
                      value={title}
                      onChange={event => setTitle(event.currentTarget.value)}
                    />
                  </div>

                  <div className="modal-add-form__input-container">
                    <label
                      htmlFor="modal-add-form__input-date"
                      className="modal-add-form__label"
                    >
                      Введите дату
                    </label>

                    <input
                      id="modal-add-form__input-date"
                      className="modal-add-form__input"
                      name="date"
                      type="date"
                      value={date}
                      onChange={event => setDate(event.currentTarget.value)}
                    />
                  </div>

                  <div className="modal-add-form__input-container">
                    <label
                      htmlFor="modal-add-form__input-desc"
                      className="modal-add-form__label"
                    >
                      Введите описание
                    </label>

                    <textarea
                      id="modal-add-form__input-desc"
                      className="modal-add-form__input"
                      name="description"
                      value={description}
                      placeholder="Описание"
                      onChange={event =>
                        setDescription(event.currentTarget.value)
                      }
                    />
                  </div>

                  <div className="modal-add-form__products">
                    <p className="modal-add-form__label">Товары:</p>

                    <ul className="modal-add-form__products-list">
                      {products.length === 0 ? (
                        <p>Товаров нет</p>
                      ) : (
                        products.map(product => (
                          <li key={product.id}>{product.title}</li>
                        ))
                      )}
                    </ul>
                  </div>
                </div>

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
                onClick={handleAddOrder}
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
