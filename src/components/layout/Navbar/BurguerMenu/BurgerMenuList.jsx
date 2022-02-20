import React from 'react';
import { Link } from 'react-router-dom';
import './BurgerMenuList.scss';

function BurgerMenuList() {
  return (
    <div className="brgr_menu">
      <Link className="brgr_menu__item" to="/">
        Home
      </Link>
      <Link className="brgr_menu__item" to="/categories">
        Products
      </Link>
      <Link className="brgr_menu__item" to="/learn">
        Learn
      </Link>
      <Link className="brgr_menu__item" to="/about">
        About
      </Link>
    </div>
  );
}

export default BurgerMenuList;
