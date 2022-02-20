import React from 'react';
import './P404.scss';
import p404img from '../../../assets/images/p404.png';

function P404() {
  return (
    <div className="p404">
      <img src={p404img} alt="lost img" />
      <div className="p404__go_back_btn">Go Back</div>
    </div>
  );
}

export default P404;
