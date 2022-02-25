import React from 'react';
import './LoginBtn.scss';
import { useAuth0 } from '@auth0/auth0-react';

function LoginBtn() {
  const { loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      <button
        type="button"
        className="login_btn"
        onClick={() => {
          loginWithRedirect();
        }}
      >
        Login
      </button>
      <button
        type="button"
        className="login_btn"
        onClick={() => loginWithRedirect({ screen_hint: 'signup' })}
      >
        Register
      </button>
      <button
        type="button"
        className="login_btn"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Logout
      </button>
    </div>
  );
}

export default LoginBtn;
