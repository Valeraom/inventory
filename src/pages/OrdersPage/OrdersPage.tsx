import { useEffect, useRef } from 'react';
import { ModalAddingOrder, Orders, PrimaryButton } from '../../components';
import { PrimaryButtonColors, PrimaryButtonTypes } from '../../enums';
import { useOrders } from '../../hooks/useOrders';

import './OrdersPage.scss';
import { Modal } from 'bootstrap';
import { getPreparedOrders } from '../../utils';
import { useSeacrhQuery } from '../../hooks';

export const OrdersPage = () => {
  const { orders } = useOrders();
  const { searchQuery } = useSeacrhQuery();

  const preparedOrders = getPreparedOrders(orders, {
    searchQuery: searchQuery.orders,
  });
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
    <div className="orders-page">
      <div className="orders-page__top-section">
        <PrimaryButton
          type={PrimaryButtonTypes.BUTTON}
          color={PrimaryButtonColors.GREEN}
          onClick={handleOpenModal}
        >
          <p className="orders-page__btn-plus">+</p>
        </PrimaryButton>

        <h1 className="orders-page__title">{`Приходы / ${preparedOrders.length}`}</h1>
      </div>

      <Orders />

      <ModalAddingOrder onClose={handleCloseModal} ref={modalRef} />
    </div>
  );
};
