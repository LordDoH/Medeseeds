import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryCard2.scss';

function CategoryCard2({ title, image }) {
  const navigate = useNavigate();
  return (
    <div
      className="category2_card"
      onClick={() => {
        navigate(`/categories/${title}`);
      }}
    >
      <img src={image} alt="category_image" className="category2_card__img" />
      <div className="category2_card__title">{title}</div>
    </div>
  );
}

export default CategoryCard2;
