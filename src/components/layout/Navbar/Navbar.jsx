import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { MdSearch, MdOutlineMenu, MdOutlineShoppingCart } from 'react-icons/md';
import { IoMdPerson } from 'react-icons/io';
import { Link } from 'react-router-dom';

import LogoMed from '../../../assets/images/LogoMed.png';
import './Navbar.scss';

function Navbar() {
  const [active, setActive] = useState([true, false, false, false]);
  const [mov, setMov] = useState(true);
  const onClick = async () => {
    setMov(!mov);
  };

  useEffect(() => {
    const ruta = window.location.pathname;
    if (ruta === '/') {
      setActive([true, false, false, false]);
    } else if (ruta === '/categories') {
      setActive([false, true, false, false]);
    } else if (ruta === '/learn') {
      setActive([false, false, true, false]);
    } else if (ruta === '/about') {
      setActive([false, false, false, true]);
    }
  }, [mov]);

  const { loginWithRedirect } = useAuth0();

  return (
    <div className="nav_bar">
      <div className="nav_bar__elements">
        <img className="nav_bar__elements__logo" src={LogoMed} alt="Logo" />
        <div className="nav_bar__elements__links">
          <Link
            to="/"
            onClick={onClick}
            className={`nav_bar__elements__links__location ${active[0]}`}
          >
            HOME
          </Link>
          <Link
            to="/categories"
            onClick={onClick}
            className={`nav_bar__elements__links__location ${active[1]}`}
          >
            PRODUCTS
          </Link>
          <Link
            to="/learn"
            onClick={onClick}
            className={`nav_bar__elements__links__location ${active[2]}`}
          >
            LEARN
          </Link>
          <Link
            to="/about"
            onClick={onClick}
            className={`nav_bar__elements__links__location ${active[3]}`}
          >
            ABOUT
          </Link>
          {/* eslint-disable-next-line */}
          <div
            onClick={() => {
              loginWithRedirect();
            }}
            className="nav_bar__elements__links--login"
          >
            <IoMdPerson />
            LOGIN
          </div>
          {/* eslint-disable-next-line */}
          <div className="nav_bar__elements__links__location" onClick={onClick}>
            <MdOutlineShoppingCart />
          </div>
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
