import { FC, useEffect, useRef } from 'react';
import './OrderInfo.scss';
import { Order } from '../../types';
import { ProductItemShort } from '../ProductItemShort';
import { PrimaryButton } from '../PrimaryButton';
import { PrimaryButtonTypes } from '../../enums';
import { Modal } from 'bootstrap';
import { ModalAddingProduct } from '../ModalAddingProduct';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

interface Props {
  selectedOrder: Order;
  onClose: () => void;
}

export const OrderInfo: FC<Props> = ({ selectedOrder, onClose }) => {
  const { id, title, description } = selectedOrder;

  const orders = useSelector((state: RootState) => state.orders.orders);
  const selectedOrderFromRedux = orders.find(order => order.id === id);
  const products = selectedOrderFromRedux?.products;

  const modalRef = useRef<HTMLDivElement>(null);
  const modalWindow = useRef<Modal | null>(null);

  const handleOpenModal = () => {
    modalWindow.current?.show();
  };

  const handleCloseModal = () => {
    modalWindow.current?.hide();
  };

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

  return (
    <div className="order-info">
      <div className="order-info__top-section">
        <h3 className="order-info__title">{title}</h3>

        <p className="order-info__desc">{description}</p>

        <button className="order-info__add-btn" onClick={handleOpenModal}>
          <div className="order-info__add-icon">+</div>

          <p className="order-info__add-btn-text">Добавить продукт</p>
        </button>
      </div>

      <div className="order-info__products">
        {products?.length === 0 ? (
          <p className="order-info__products-absent">Товаров нет</p>
        ) : (
          products?.map(product => (
            <ProductItemShort key={product.id} product={product} />
          ))
        )}
      </div>

      <div className="order-info__close">
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

      <ModalAddingProduct
        order={selectedOrder}
        onClose={handleCloseModal}
        ref={modalRef}
      />
    </div>
  );
};
