import React, { useEffect, useState, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useLazyQuery, gql } from '@apollo/client';
import { MdSearch, MdOutlineShoppingCart } from 'react-icons/md';
import { IoMdPerson } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../store/action';
import ProfileButton from './ProfileBtn/ProfileButton';
import BurgerMenu from './BurguerMenu/BurgerMenu';
import Cart from '../Cart/Cart';

import LogoMed from '../../../assets/images/LogoMed.png';
import './Navbar.scss';

const USER_BY_TOKEN = gql`
  query getUserByToken($token: String!) {
    getUserByToken(token: $token) {
      email
      name
      role
      id
      photo
    }
  }
`;

function Navbar() {
  // Actual page functionality
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

  // Load user data in any page
  const { isAuthenticated, isLoading } = useAuth0();

  const [getUser] = useLazyQuery(USER_BY_TOKEN, {
    variables: { token: localStorage.getItem('token') },
  });
  const dispatch = useDispatch();

  useEffect(async () => {
    if (isAuthenticated) {
      if (localStorage.getItem('token')) {
        try {
          const response = await getUser();
          dispatch(actions.obtainedUser(response.data.getUserByToken));
        } catch (error) {
          // console.log(error);
        }
      }
    }
    if (isLoading === false) {
      if (isAuthenticated === false) {
        dispatch(actions.closeSesion());
      }
      // if (!localStorage.getItem('token')) {
      //   dispatch(actions.closeSesion());
      // }
    }
  }, [isLoading]);

  // function of login button
  const { loginWithRedirect } = useAuth0();

  // extract userAuthenticated
  const isAuth = useSelector((state) => state.userAuthenticated);

  // extract user
  const currentUser = useSelector((state) => state.currentUser);

  // Cart deploy function
  const dropdownRef = useRef(null);

  const [isActive, setIsActive] = useState(false);

  const onClick2 = () => setIsActive(!isActive);

  return (
    <div>
      <div className="nav_bar">
        <div className="nav_bar__elements">
          <Link to="/" onClick={onClick}>
            <img className="nav_bar__elements__logo" src={LogoMed} alt="Logo" />
          </Link>
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
          {!isAuth?(<div
                onClick={() => {
                  loginWithRedirect();
                }}
                className="nav_bar__elements__links--login"
              >
                <IoMdPerson />
                LOGIN
              </div>
            ) : (
              <ProfileButton currentUser={currentUser} />
            )}
            {/* eslint-disable-next-line */}
            <div onClick={onClick2} className="nav_bar__elements__links__location">
              <MdOutlineShoppingCart />
            </div>
          </div>
          <div className="nav_bar__elements__links_mob">
            <MdSearch />
            {/* eslint-disable-next-line */}
          {!isAuth?(<div
                onClick={() => {
                  loginWithRedirect();
                }}
                className="nav_bar__elements__links_mob__cart"
              >
                <IoMdPerson />
              </div>
            ) : (
              <ProfileButton currentUser={currentUser} />
            )}
            <div
              onClick={onClick2}
              className="nav_bar__elements__links_mob__cart"
            >
              <MdOutlineShoppingCart />
            </div>
            <BurgerMenu />
          </div>
        </div>
        <div className="nav_bar__routes">Welcome</div>
      </div>
      <div
        className={`nav_bar__menu ${isActive ? 'active' : null}`}
        ref={dropdownRef}
      >
        <Cart />
      </div>
    </div>
  );
}

export default Navbar;
