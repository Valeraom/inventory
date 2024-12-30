import { Modal } from 'bootstrap';
import { FC, useEffect, useRef } from 'react';

import { Order } from '../../types';
import { Currency, PrimaryButtonTypes } from '../../enums';
import { getProductsTotalPrice, getFormattedDate } from '../../utils';

import productsIcon from '../../assets/images/icons/open-order.png';
import removeIcon from '../../assets/images/icons/remove-btn.png';
import rightArrow from '../../assets/images/icons/arrow-right.png';
import { ModalDeletingOrder } from '../../components';
import { PrimaryButton } from '../PrimaryButton';
import './OrderItem.scss';

interface Props {
  order: Order;
  selectedOrderId?: number | null;
  onSelect: () => void;
  onClose: () => void;
}

export const OrderItem: FC<Props> = ({
  order,
  selectedOrderId,
  onSelect,
  onClose,
}) => {
  const { id, title, date, products } = order;

  const totalPriceUAH = getProductsTotalPrice(products, Currency.UAH);
  const totalPriceUSD = getProductsTotalPrice(products, Currency.USD);

  const modalRef = useRef<HTMLDivElement>(null);
  const modalWindow = useRef<Modal | null>(null);

  useEffect(() => {
    if (modalRef.current) {
      modalWindow.current = new Modal(modalRef.current);
    }
    return () => {
      if (modalWindow.current) {
        modalWindow.current.dispose();
      }
    };
  }, []);

  const handleOpenModal = () => {
    modalWindow.current?.show();
  };

  const handleCloseModal = () => {
    modalWindow.current?.hide();
  };

  return (
    <div className="order px-5 py-3">
      {!selectedOrderId && (
        <h3
          role="button"
          tabIndex={0}
          className="order__title"
          onClick={onSelect}
        >
          {title}
        </h3>
      )}

      <div className="order__products-btn">
        <PrimaryButton type={PrimaryButtonTypes.BUTTON} onClick={onSelect}>
          <img
            src={productsIcon}
            alt="Open products"
            className="order__products-icon"
          />
        </PrimaryButton>
      </div>

      <div className="order__count-container">
        <p className="order__count">{products.length}</p>

        <p className="order__count-label">Продукта</p>
      </div>

      <p className="order__date">{getFormattedDate(date)}</p>

      {!selectedOrderId && (
        <div className="order__price">
          <p className="order__price--usd">{totalPriceUSD} $</p>
          <p className="order__price--uah">{totalPriceUAH} UAH</p>
        </div>
      )}

      {!selectedOrderId && (
        <button
          type="button"
          className="order__remove-btn"
          onClick={handleOpenModal}
        >
          <img
            src={removeIcon}
            alt="Remove order"
            className="order__remove-img"
          />
        </button>
      )}

      {selectedOrderId === id && (
        <button className="order__close" onClick={onClose}>
          <img src={rightArrow} alt="Right arrow" className="order__arrow" />
        </button>
      )}

      <ModalDeletingOrder
        ref={modalRef}
        onClose={handleCloseModal}
        order={order}
      />
    </div>
  );
};
