import cn from 'classnames';
import { FC, FormEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import './PrimaryButton.scss';
import { PrimaryButtonColors } from '../../enums/PrimaryButtonColors';
import { PrimaryButtonTypes } from '../../enums/PrimaryButtonTypes';

interface Props {
  children: ReactNode;
  onClick?: (event: FormEvent) => void;
  type: PrimaryButtonTypes;
  color?: PrimaryButtonColors;
  path?: string;
  className?: string;
}

const getButtonClass = (color?: PrimaryButtonColors) => {
  return cn('primary-button', {
    'primary-button--green': color === PrimaryButtonColors.GREEN,
  });
};

export const PrimaryButton: FC<Props> = ({
  children,
  onClick,
  type,
  color,
  path,
  className,
}) => {
  return type === PrimaryButtonTypes.LINK ? (
    <Link to={path!} className={`${className} ${getButtonClass(color)}`}>
      {children}
    </Link>
  ) : (
    <button
      className={`${className} ${getButtonClass(color)}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};
