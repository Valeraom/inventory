import { FC, useEffect, useRef } from 'react';
import { Modal } from 'bootstrap';

import { Product } from '../../types';
import { getFormattedDate } from '../../utils';

import './ProductItem.scss';
import removeIcon from '../../assets/images/icons/remove-btn.png';
import { ModalDeletingProduct } from '../ModalDeletingProduct';

interface Props {
  product: Product;
}

export const ProductItem: FC<Props> = ({ product }) => {
  const {
    title,
    serialNumber,
    photo,
    guarantee,
    isNew,
    type,
    date,
    price,
    order,
  } = product;

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
    <div className="product-item">
      <div className="product-item__indicator me-3"></div>

      <img
        src={photo}
        alt="Фото продукта"
        className="product-item__photo me-3"
      />

      <div className="product-item__main-info me-5">
        <h4 className="product-item__title">{title}</h4>

        <p className="product-item__serial-num">{serialNumber}</p>
      </div>

      <p className="product-item__status me-5">свободен</p>

      <div className="product-item__guarantee">
        <p className="product-item__guarantee--start">{`c ${getFormattedDate(guarantee.start)}`}</p>

        <p className="product-item__guarantee--end">{`по ${getFormattedDate(guarantee.end)}`}</p>
      </div>

      <div className="product-item__is-new">{isNew ? 'новый' : 'Б/У'}</div>

      <div className="product-item__price">
        <p className="product-item__price--usd">{price[0].value} USD</p>

        <p className="product-item__price--uah">{price[1].value} UAH</p>
      </div>

      <div className="product-item__group">{type}</div>

      <div className="product-item__client">-</div>

      <div className="product-item__order">{order}</div>

      <div className="product-item__order-date">{getFormattedDate(date)}</div>

      <button className="product-item__remove-btn" onClick={handleOpenModal}>
        <img
          src={removeIcon}
          alt="Remove product"
          className="product-item__remove-img"
        />
      </button>

      <ModalDeletingProduct
        ref={modalRef}
        onClose={handleCloseModal}
        product={product}
      />
    </div>
  );
};
