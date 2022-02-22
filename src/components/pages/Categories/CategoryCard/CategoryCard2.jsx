import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './CategoryCard2.scss';
import actions from '../../../../store/action';

function CategoryCard2({ title, image }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const linkto = () => {
    dispatch(actions.loadedRoute(`/categories/${title}`));
    navigate(`/categories/${title}`);
  };

  return (
    <div className="category2_card" onClick={linkto}>
      <img src={image} alt="category_image" className="category2_card__img" />
      <div className="category2_card__title">{title}</div>
    </div>
  );
}

export default CategoryCard2;
