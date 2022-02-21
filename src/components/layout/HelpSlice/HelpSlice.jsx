import React from 'react';
import { IoMdHelpCircle } from 'react-icons/io';
import './HelpSlice.scss';

function HelpSlice() {
  return (
    <div className="help_slice">
      <div className="help_slice__content">
        <div className="help_slice__content__icon">
          <IoMdHelpCircle />
        </div>
        <div className="help_slice__content__title">Questions?</div>
      </div>
      <div className="help_slice__description">
        We are here to help you, just send us a message and we will answer in a
        short time.
      </div>
    </div>
  );
}

export default HelpSlice;
