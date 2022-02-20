import React from 'react';
import './P404.scss';
// import { useNavigate } from 'react-router-dom';
import p404img from '../../../assets/images/p404.png';

function P404() {
  // const navigate = useNavigate();
  return (
    <div className="p404">
      <img src={p404img} alt="lost img" />
      {/* eslint-disable-next-line */}
      <a className="p404__go_back_btn" href="/">Go Home</a>
    </div>
  );
}

export default P404;
