import React from 'react';
import './CategoryCard.scss';

function CategoryCard({ title, image }) {
  return (
    <div className="category_card">
      <img src={image} alt="category_image" className="category_card__img" />
      <div className="category_card__title">{title}</div>
    </div>
  );
}

export default CategoryCard;
