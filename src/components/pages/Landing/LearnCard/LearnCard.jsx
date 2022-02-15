import React from 'react';
import './LearnCard.scss';

function LearnCard({ image, title, description }) {
  const shortTitle = title.length > 40 ? `${title.slice(0, 40)}...` : title;
  return (
    <div className="learn_card">
      <img className="learn_card__img" src={image} alt="PostImage" />
      <div className="learn_card__title_mob">{shortTitle}</div>
      <div className="learn_card__content">
        <div className="learn_card__content--Title">{shortTitle}</div>
        <div className="learn_card__content--Description">{description}...</div>
        <div className="learn_card__content--More">Read more...</div>
      </div>
    </div>
  );
}

export default LearnCard;
