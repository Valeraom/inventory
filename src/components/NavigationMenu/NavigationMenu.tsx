import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { Paths, PrimaryButtonTypes } from '../../enums';
import { navigationLinks } from '../../constants';

import { PrimaryButton } from '../PrimaryButton';
import settingsIcon from '../../assets/images/icons/settings.png';
import userPhoto from '/src/assets/images/user-photo.png';
import './NavigationMenu.scss';

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

        <div className="navigation-menu__settings">
          <PrimaryButton type={PrimaryButtonTypes.LINK} path={Paths.SETTINGS}>
            <img
              src={settingsIcon}
              alt="Settings"
              className="navigation-menu__settings-icon"
            />
          </PrimaryButton>
        </div>
      </div>

      <nav>
        <ul className="navigation-menu__list">
          {navigationLinks.map(link => (
            <li key={link.title}>
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
