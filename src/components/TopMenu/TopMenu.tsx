import { Link } from 'react-router-dom';
import './TopMenu.scss';
import { Paths } from '../../enums';

export const TopMenu = () => {
  return (
    <div className="top-menu">
      <div className="top-menu__left">
        <Link to={Paths.HOME}>
          <div className="top-menu__logo">
            <img
              src="src\assets\images\logo.png"
              alt="Logo"
              className="top-menu__img"
            />
            <p className="top-menu__title">Inventory</p>
          </div>
        </Link>

        <input type="text" placeholder="Поиск" className="top-menu__search" />
      </div>

      <p>Дата и время</p>
    </div>
  );
};
