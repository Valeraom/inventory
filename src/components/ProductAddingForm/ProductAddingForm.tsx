import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { Modal } from 'bootstrap';

import { Product } from '../../types';
import { ProductSpecification, ProductTypes } from '../../enums';
import { exchangeRates } from '../../constants';

import { ModalError } from '../ModalError';
import './ProductAddingForm.scss';

interface Props {
  onAdd: (product: Omit<Product, 'id' | 'date' | 'order'>) => void;
  onCloseProductForm: () => void;
}

export const ProductAddingForm: FC<Props> = ({ onAdd, onCloseProductForm }) => {
  const [serNumber, setSerNumber] = useState<number | ''>('');
  const [isNew, setIsNew] = useState<number>(1);
  const [productPhoto, setProductPhoto] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [productType, setProductType] = useState<ProductTypes>(
    ProductTypes.MONITORS,
  );
  const [specification, setSpecification] = useState<string>('');
  const [startGuarantee, setStartGuarantee] = useState<string>('');
  const [endGuarantee, setEndGuarantee] = useState<string>('');
  const [productPrice, setProductPrice] = useState<number | ''>('');

  const handleChangeSerNumber = (event: ChangeEvent<HTMLInputElement>) => {
    if (!Number(event.currentTarget.value)) {
      return;
    }

    setSerNumber(Number(event.currentTarget.value));
  };

  const handleChangePrice = (event: ChangeEvent<HTMLInputElement>) => {
    if (!Number(event.currentTarget.value)) {
      return;
    }

    setProductPrice(Number(event.currentTarget.value));
  };

  const handleAddProduct = () => {
    if (!startGuarantee || !endGuarantee) {
      handleOpenModal();
      return;
    }

    const newProduct = {
      serialNumber: Number(serNumber),
      isNew: isNew,
      photo: productPhoto,
      title: title,
      type: productType,
      specification: specification,
      guarantee: {
        start: startGuarantee,
        end: endGuarantee,
      },
      price: [
        {
          value: Math.floor(Number(productPrice) / exchangeRates.dollar),
          symbol: 'USD',
          isDefault: 0,
        },
        { value: Number(productPrice), symbol: 'UAH', isDefault: 1 },
      ],
    };

    onAdd(newProduct);
    onCloseProductForm();
  };

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
    <div className="product-form">
      <div className="product-form__container">
        <label
          htmlFor="product-form__input-serial"
          className="product-form__label"
        >
          Введите серийный номер товара
        </label>

        <input
          id="product-form__input-serial"
          className="product-form__input"
          name="serial-number"
          type="text"
          placeholder="Серийный номер"
          value={serNumber}
          onChange={handleChangeSerNumber}
        />
      </div>

      <fieldset className="product-form__container">
        <legend className="product-form__label">Новый ли товар?</legend>

        <div>
          <input
            type="radio"
            id="product-form__old"
            name="isNew"
            value={0}
            onChange={event => setIsNew(Number(event.currentTarget.value))}
          />
          <label htmlFor="product-form__old">Б/У</label>
        </div>

        <div>
          <input
            type="radio"
            id="product-form__new"
            name="isNew"
            value={1}
            onChange={event => setIsNew(Number(event.currentTarget.value))}
          />
          <label htmlFor="product-form__new">Новый</label>
        </div>
      </fieldset>

      <div className="product-form__container">
        <label
          htmlFor="product-form__input-photo"
          className="product-form__label"
        >
          Введите URL для фото товара
        </label>

        <input
          id="product-form__input-photo"
          className="product-form__input"
          name="product-photo"
          type="text"
          placeholder="URL фото"
          value={productPhoto}
          onChange={event => setProductPhoto(event.currentTarget.value)}
        />
      </div>

      <div className="product-form__container">
        <label
          htmlFor="product-form__input-title"
          className="product-form__label"
        >
          Укажите название продукта
        </label>

        <input
          id="product-form__input-title"
          className="product-form__input"
          name="product-title"
          type="text"
          placeholder="Название товара"
          value={title}
          onChange={event => setTitle(event.currentTarget.value)}
        />
      </div>

      <div className="product-form__container">
        <label
          htmlFor="product-form__input-type"
          className="product-form__label"
        >
          Укажите тип продукта
        </label>
        <select
          id="product-form__input-type"
          className="product-form__input"
          value={productType}
          onChange={event =>
            setProductType(event.currentTarget.value as ProductTypes)
          }
        >
          <option value={ProductTypes.MONITORS}>Мониторы</option>
          <option value={ProductTypes.PHONES}>Смартфоны</option>
          <option value={ProductTypes.TABLETS}>Планшеты</option>
        </select>
      </div>

      <div className="product-form__container">
        <label
          htmlFor="product-form__input-spec"
          className="product-form__label"
        >
          Укажите спецификацию
        </label>

        <select
          id="product-form__input-spec"
          className="product-form__input"
          value={specification}
          onChange={event =>
            setSpecification(event.currentTarget.value as ProductSpecification)
          }
        >
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

      <div className="modal-add-form__input-container">
        <label
          htmlFor="modal-add-form__input-start-guarantee"
          className="product-form__label"
        >
          Начало гарантии
        </label>

        <input
          id="modal-add-form__input-start-guarantee"
          className="modal-add-form__input"
          name="start-guarantee"
          type="date"
          value={startGuarantee}
          onChange={event => setStartGuarantee(event.currentTarget.value)}
        />
      </div>

      <div className="modal-add-form__input-container">
        <label
          htmlFor="modal-add-form__input-end-guarantee"
          className="product-form__label"
        >
          Окончание гарантии
        </label>

        <input
          id="modal-add-form__input-end-guarantee"
          className="product-form__input"
          name="end-guarantee"
          type="date"
          value={endGuarantee}
          onChange={event => setEndGuarantee(event.currentTarget.value)}
        />
      </div>

      <div className="product-form__container">
        <label
          htmlFor="product-form__input-price"
          className="product-form__label"
        >
          Укажите цену в гривнах
        </label>

        <input
          id="product-form__input-price"
          className="product-form__input"
          name="product-price"
          type="text"
          placeholder="Цена"
          value={productPrice}
          onChange={handleChangePrice}
        />
      </div>

      <div className="product-form__btns">
        <button className="product-form__close" onClick={onCloseProductForm}>
          Отменить
        </button>

        <button
          className="product-form__add-product"
          onClick={handleAddProduct}
        >
          Добавить продукт
        </button>
      </div>

      <ModalError
        errorMessage="Заполните все поля ввода"
        ref={modalRef}
        onClose={handleCloseModal}
      />
    </div>
  );
};
