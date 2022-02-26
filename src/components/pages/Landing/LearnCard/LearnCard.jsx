import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import actions from '../../../../store/action';
import './LearnCard.scss';

function LearnCard({ image, title, description }) {
  const shortTitle = title.length > 40 ? `${title.slice(0, 40)}...` : title;
  const shortDesc =
    description.length > 200 ? `${description.slice(0, 190)}...` : description;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const linkto = (e) => {
    dispatch(actions.loadedRoute(e));
    navigate(e);
    window.scroll(0, 0);
  };
  return (
    <div className="learn_card">
      <img
        className="learn_card__img"
        src={image}
        alt="PostImage"
        onClick={() => linkto(`/learn/${title.slice(0, 15)}`)}
      />
      <div className="learn_card__title_mob">{shortTitle}</div>
      <div className="learn_card__content">
        <div className="learn_card__content--Title">{shortTitle}</div>
        <div className="learn_card__content--Description">{shortDesc}</div>
        <div
          className="learn_card__content--More"
          onClick={() => linkto(`/learn/${title.slice(0, 15)}`)}
        >
          Read more...
        </div>
      </div>
    </div>
  );
}

export default LearnCard;
