import React, { useState, useRef, useEffect } from 'react';
import './BurgerMenu.scss';
import { MdOutlineMenu } from 'react-icons/md';
import BurgerMenuList from './BurgerMenuList';

function BurgerMenu() {
  // Hook to Refer itself
  const dropdownRef = useRef(null);
  // State to deploy
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const pageClickEvent = (e) => {
      // If the active element exists and is clicked outside of
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsActive(!isActive);
      }
    };

    // If the item is active (ie open) then listen for clicks
    if (isActive) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [isActive]);

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
