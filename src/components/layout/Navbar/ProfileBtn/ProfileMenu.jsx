import React, { useMemo } from 'react';
import { IconContext } from 'react-icons';

import {
  BsQuestionCircleFill,
  BsFillGearFill,
  BsBoxArrowInRight,
  BsTranslate,
} from 'react-icons/bs';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useNavigate } from 'react-router-dom';
import './ProfileMenu.scss';

function ProfileMenu({ authenticateUser }) {
  const navigate = useNavigate();
  const { logout } = useAuth0();

  const value = useMemo(() => ({ className: 'Iconos' }));
  return (
    <ul className="profile_menu">
      <li className="profile_menu__item">
        <img
          className="profile_menu__item__img"
          src={authenticateUser?.photo}
          alt="Imagen de Perfil"
        />

        <Link className="profile_menu__item__text2" to="/profile">
          Profile
        </Link>
      </li>

      <IconContext.Provider value={value}>
        <li className="profile_menu__item">
          <div className="profile_menu__item__icon">
            <BsQuestionCircleFill />
          </div>
          <Link className="profile_menu__item__text" to="/about">
            Help
          </Link>
        </li>
        <li className="profile_menu__item">
          <div className="profile_menu__item__icon">
            <BsTranslate />
          </div>
          <Link className="profile_menu__item__text" to="/lang">
            Language
          </Link>
        </li>
        <li className="profile_menu__item">
          <div className="profile_menu__item__icon">
            <BsFillGearFill />
          </div>
          <Link className="profile_menu__item__text" to="/editprofile">
            Config
          </Link>
        </li>
        <li className="profile_menu__item">
          <div className="profile_menu__item__icon">
            <BsBoxArrowInRight />
          </div>
          <button
            className="profile_menu__item__btn"
            type="button"
            onClick={async () => {
              await logout({ returnTo: window.location.origin });
              navigate('/');
            }}
          >
            Logout
          </button>
        </li>
      </IconContext.Provider>
    </ul>
  );
}

export default ProfileMenu;
