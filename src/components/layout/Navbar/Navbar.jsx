import React from 'react';
import { MdSearch, MdOutlineMenu, MdOutlineShoppingCart } from 'react-icons/md';
import { IoMdPerson } from 'react-icons/io';

import LogoMed from '../../../assets/images/LogoMed.png';
import './Navbar.scss';

function Navbar() {
  return (
    <div className="nav_bar">
      <div className="nav_bar__elements">
        <img className="nav_bar__elements__logo" src={LogoMed} alt="Logo" />
        <div className="nav_bar__elements__links">
          <span>HOME</span>
          <span>PRODUCTS</span>
          <span>LEARN</span>
          <span>ABOUT</span>
          <span className="nav_bar__elements__links--login">
            <IoMdPerson />
            LOGIN
          </span>
          <span>
            <MdOutlineShoppingCart />
          </span>
        </div>
        <div className="nav_bar__elements__links_mob">
          <MdSearch />
          <IoMdPerson />
          <MdOutlineShoppingCart />
          <MdOutlineMenu />
        </div>
      </div>
      <div className="nav_bar__routes">Welcome</div>
    </div>
  );
}

export default Navbar;
