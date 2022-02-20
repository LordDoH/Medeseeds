import React from 'react';
import { GoAlert } from 'react-icons/go';

import './GuaranteePolicy.scss';

function GuaranteePolicy() {
  return (
    <div className="gp">
      <div className="gp__content">
        <div className="gp__content__icon">
          <GoAlert />
        </div>
        <div className="gp__content__title">Guarantee Policy</div>
      </div>
      <div className="gp__description">
        All our products have a 10-day after being received guarantee, to make
        it valid, keep your product pack in a good state and make sure of
        sending us evidence of how you received the product.
      </div>
    </div>
  );
}

export default GuaranteePolicy;
