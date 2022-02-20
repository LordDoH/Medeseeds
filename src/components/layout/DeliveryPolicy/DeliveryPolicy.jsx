import React from 'react';
import { BsBoxSeam } from 'react-icons/bs';
import './DeliveryPolicy.scss';

function DeliveryPolicy() {
  return (
    <div className="dp">
      <div className="dp__content">
        <div className="dp__content__icon">
          <BsBoxSeam />
        </div>
        <div className="dp__content__title">Delivery Policy</div>
      </div>
      <div className="dp__description">
        Be aware of our delivery policy to get your order safely and quickly.
      </div>
    </div>
  );
}

export default DeliveryPolicy;
