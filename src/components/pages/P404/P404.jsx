import React from 'react';
import './P404.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import p404img from '../../../assets/images/p404.png';
import actions from '../../../store/action';

function P404() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const linkto = () => {
    dispatch(actions.loadedRoute(`/`));
    navigate(`/`);
  };

  return (
    <div className="p404">
      <img src={p404img} alt="lost img" />
      <button type="button" className="p404__go_back_btn" onClick={linkto}>
        Go Home
      </button>
    </div>
  );
}

export default P404;
