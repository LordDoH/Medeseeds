import React, { useRef, useState, useEffect } from 'react';
import './ProfileButton.scss';
import { IoMdPerson } from 'react-icons/io';
import ProfileMenu from './ProfileMenu';

function ProfileButton({ currentUser }) {
  const dropdownRef = useRef(null);

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

  const onClick = () => setIsActive(!isActive);

  return (
    <div className="profilebtn">
      {/* eslint-disable-next-line */}
    <div
        onClick={onClick}
        className="profilebtn__btn"
      >
        <IoMdPerson />
        <div className="profilebtn__btn__desktop">
          {currentUser?.name?.toUpperCase()}
        </div>
      </div>
      <div
        className={`profilebtn__menu ${isActive ? 'active' : null}`}
        ref={dropdownRef}
      >
        <ProfileMenu authenticateUser={currentUser} />
      </div>
    </div>
  );
}

export default ProfileButton;
