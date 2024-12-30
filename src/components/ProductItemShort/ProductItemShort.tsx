import { FC, useEffect, useRef } from 'react';

import { Product } from '../../types';

import './ProductItemShort.scss';
import removeIcon from '../../assets/images/icons/remove-btn.png';
import { Modal } from 'bootstrap';
import { ModalDeletingProduct } from '../ModalDeletingProduct';

interface Props {
  product: Product;
}

export const ProductItemShort: FC<Props> = ({ product }) => {
  const { title, serialNumber, photo } = product;

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
    <div className="product-item-short">
      <div className="product-item-short__indicator me-3"></div>

      <img
        src={photo}
        alt="Фото продукта"
        className="product-item-short__photo me-3"
      />

      <div className="product-item-short__main-info me-5">
        <h4 className="product-item-short__title">{title}</h4>

        <p className="product-item-short__serial-num">{serialNumber}</p>
      </div>

      <p className="product-item-short__status me-5">свободен</p>

      <button
        className="product-item-short__remove-btn"
        onClick={handleOpenModal}
      >
        <img
          src={removeIcon}
          alt="Remove product"
          className="product-item-short__remove-img"
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
