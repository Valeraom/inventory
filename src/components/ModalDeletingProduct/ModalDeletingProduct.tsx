import { ForwardedRef, forwardRef } from 'react';
import './ModalDeletingProduct.scss';
import { Product } from '../../types';

import { PrimaryButtonTypes } from '../../enums';
import { PrimaryButton } from '../PrimaryButton';
import { useOrders } from '../../hooks/useOrders';

interface Props {
  onClose: () => void;
  product: Product;
}

export const ModalDeletingProduct = forwardRef<HTMLDivElement, Props>(
  ({ onClose, product }, ref: ForwardedRef<HTMLDivElement>) => {
    const { id, title, serialNumber, photo, order: orderId } = product;

    const { onRemoveProduct } = useOrders();

    const handleRemoveProduct = () => {
      onRemoveProduct(orderId, id);
      onClose();
    };

    return (
      <div ref={ref} className="modal fade center" tabIndex={-1} role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {`Вы уверены, что хотите удалить этот продукт?`}
              </h5>
            </div>

            <div className="modal-body">
              <div className="modal-product">
                <div className="product-item-short__indicator me-3"></div>

                <img
                  src={photo}
                  alt="Фото продукта"
                  className="product-item-short__photo me-3"
                />

                <div className="product-item-short__main-info me-5">
                  <h4 className="product-item-short__title">{title}</h4>

                  <p className="product-item-short__serial-num">
                    {serialNumber}
                  </p>
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
                className="modal__delete-btn"
                onClick={handleRemoveProduct}
              >
                <div className="modal__delete-icon"></div>

                <p>Удалить</p>
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
