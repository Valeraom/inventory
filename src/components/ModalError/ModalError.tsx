import { ForwardedRef, forwardRef } from 'react';
import { PrimaryButtonTypes } from '../../enums';
import { PrimaryButton } from '../PrimaryButton';

import './ModalError.scss';

interface Props {
  onClose: () => void;
  errorMessage: string;
}

export const ModalError = forwardRef<HTMLDivElement, Props>(
  ({ onClose, errorMessage }, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div
        ref={ref}
        className="modal fade modal__backdrop"
        tabIndex={-1}
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog--error modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Ошибка</h5>
            </div>

            <div className="modal-body modal-body--error">{errorMessage}</div>

            <div className="modal-footer modal-footer--error">
              <button
                type="button"
                className="modal__cancel-btn modal__cancel-btn--error"
                onClick={onClose}
              >
                Ок
              </button>
            </div>

            <div className="modal__close">
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
          </div>
        </div>
      </div>
    );
  },
);
