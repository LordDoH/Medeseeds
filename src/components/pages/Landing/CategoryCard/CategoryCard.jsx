import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './CategoryCard.scss';
import actions from '../../../../store/action';

function CategoryCard({ title, image }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const linkto = () => {
    dispatch(actions.loadedRoute('/categories'));
    navigate(`/categories/${title}`);
    window.scroll(0, 0);
  };

  return (
    <div className="category_card" onClick={linkto} data-test="top-category">
      <img src={image} alt="category_image" className="category_card__img" />
      <div className="category_card__title">{title}</div>
    </div>
  );
}

export default CategoryCard;
