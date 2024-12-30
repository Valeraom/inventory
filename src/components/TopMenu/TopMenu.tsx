import { Link, useLocation } from 'react-router-dom';
import { ChangeEvent } from 'react';
import { useSeacrhQuery } from '../../hooks/useSearchQuery';

import { Paths } from '../../enums';

import './TopMenu.scss';
import { DateInfo } from '../DateInfo';

export const TopMenu = () => {
  const location = useLocation();
  const { onAddOrdersSearchQuery, onAddProductsSearchQuery } = useSeacrhQuery();

  const handleAddSearchQuery = (event: ChangeEvent<HTMLInputElement>) => {
    switch (location.pathname.split('/')[1]) {
      case 'products':
        onAddProductsSearchQuery(event.currentTarget.value);
        break;
      case 'orders':
        onAddOrdersSearchQuery(event.currentTarget.value);
        break;
    }
  };

  return (
    <div className="top-menu">
      <div className="top-menu__left">
        <Link to={Paths.HOME}>
          <div className="top-menu__logo">
            <img
              src="/src/assets/images/logo.png"
              alt="Logo"
              className="top-menu__img"
            />
            <p className="top-menu__title">Inventory</p>
          </div>
        </Link>

        <input
          type="text"
          placeholder="Поиск"
          className="top-menu__search"
          onChange={handleAddSearchQuery}
        />
      </div>

      <DateInfo />
    </div>
  );
};
