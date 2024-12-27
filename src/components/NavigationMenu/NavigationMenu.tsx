import { Link, NavLink } from 'react-router-dom';

import userPhoto from '/src/assets/images/user-photo.png';
import { navigationLinks } from '../../constants';
import './NavigationMenu.scss';
import { Paths } from '../../enums';
import cn from 'classnames';

const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return cn('navigation-menu__link', {
    'navigation-menu__link--active': isActive,
  });
};

export const NavigationMenu = () => {
  return (
    <div className="navigation-menu">
      <div className="navigation-menu__avatar">
        <img
          src={userPhoto}
          alt="User Photo"
          className="navigation-menu__photo"
        />
        <Link to={Paths.SETTINGS} className="navigation-menu__settings"></Link>
      </div>

      <nav>
        <ul className="navigation-menu__list">
          {navigationLinks.map(link => (
            <li>
              <NavLink to={link.path} className={getLinkClass}>
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
