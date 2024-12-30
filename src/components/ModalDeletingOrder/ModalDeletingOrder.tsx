import { ForwardedRef, forwardRef } from 'react';
import './ModalDeletingOrder.scss';
import { Order } from '../../types';
import { getFormattedDate } from '../../utils/getFormattedDate';
import { getProductsTotalPrice } from '../../utils';
import { Currency, PrimaryButtonTypes } from '../../enums';
import { PrimaryButton } from '../PrimaryButton';
import { useOrders } from '../../hooks/useOrders';

interface Props {
  onClose: () => void;
  order: Order;
}

export const ModalDeletingOrder = forwardRef<HTMLDivElement, Props>(
  ({ onClose, order }, ref: ForwardedRef<HTMLDivElement>) => {
    const { id, date, products, title } = order;

    const { onRemoveOrder } = useOrders();

    const formattedDate = getFormattedDate(date);

    const totalPriceUAH = getProductsTotalPrice(products, Currency.UAH);
    const totalPriceUSD = getProductsTotalPrice(products, Currency.USD);

    return (
      <div ref={ref} className="modal fade center" tabIndex={-1} role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {`Вы уверены, что хотите удалить этот приход?`}
              </h5>
            </div>

            <div className="modal-body">
              <div className="modal-order">
                <h4 className="modal-order__title">{title}</h4>

                <div className="modal-order__count-container">
                  <p className="modal-order__count">{products.length}</p>

                  <p className="modal-order__count-label">Продукта</p>
                </div>

                <p className="modal-order__date">{formattedDate}</p>

                <div className="modal-order__price">
                  <p className="modal-order__price--usd">{totalPriceUSD} USD</p>

                  <p className="modal-order__price--uah">{totalPriceUAH} UAH</p>
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
                onClick={() => onRemoveOrder(id)}
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
