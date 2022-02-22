import React from 'react';
import './Spinner.scss';

function Spinner() {
  return (
    <div className="loader">
      <div className="loader__spinner">
        <div />
      </div>
      <span className="loader__text">Loading</span>
    </div>
  );
}

export default Spinner;
