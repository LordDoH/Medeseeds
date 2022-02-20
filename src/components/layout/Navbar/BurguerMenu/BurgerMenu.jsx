import React, { useState, useRef } from 'react';
import './BurgerMenu.scss';
import { MdOutlineMenu } from 'react-icons/md';
import BurgerMenuList from './BurgerMenuList';

function BurgerMenu() {
  // Hook to Refer itself
  const dropdownRef = useRef(null);
  // State to deploy
  const [isActive, setIsActive] = useState(false);
  // Change State on click
  const onClick = () => setIsActive(!isActive);
  return (
    <div className="brgr_menubtn">
      {/* Three lines button */}
      <button className="brgr_menubtn__btn" type="button" onClick={onClick}>
        <MdOutlineMenu />
      </button>
      {/* Check State to deploy menu */}
      <nav
        className={`brgr_menubtn__deploy ${isActive ? 'active' : null}`}
        ref={dropdownRef}
      >
        <BurgerMenuList />
      </nav>
    </div>
  );
}

export default BurgerMenu;
