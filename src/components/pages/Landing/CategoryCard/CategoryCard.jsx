import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryCard.scss';

function CategoryCard({ title, image }) {
  const navigate = useNavigate();
  return (
    <div
      className="category_card"
      onClick={() => {
        navigate(`/categories/${title}`);
      }}
    >
      <img src={image} alt="category_image" className="category_card__img" />
      <div className="category_card__title">{title}</div>
    </div>
  );
}

export default CategoryCard;
