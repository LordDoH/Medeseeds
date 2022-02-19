import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useLazyQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import './Auth.scss';
import { useDispatch } from 'react-redux';
import actions from '../../../store/action';

const NEW_USER = gql`
  mutation newUser($input: UserInput) {
    newUser(input: $input) {
      id
      name
      lastName
      email
    }
  }
`;

const AUTH_BY_EMAIL = gql`
  mutation authenticateUserVer($input: AuthenticateInput) {
    authenticateUserVer(input: $input) {
      token
    }
  }
`;

const USER_BY_TOKEN = gql`
  query getUserByToken($token: String!) {
    getUserByToken(token: $token) {
      email
      name
      role
      id
      orders {
        order
      }
    }
  }
`;

function Auth() {
  const [newUser] = useMutation(NEW_USER);
  const [authenticateUserVer] = useMutation(AUTH_BY_EMAIL);

  const { user, isLoading, isAuthenticated, logout } = useAuth0();
  const [check, setCheck] = useState(false);
  const [verif, setVerif] = useState(false);
  const [loadingp, setLoading] = useState(true);
  const [tokens, setTokens] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // If there is no token try to create new user in DB
  useEffect(async () => {
    if (user) {
      if (!localStorage.getItem('token')) {
        try {
          await newUser({
            variables: {
              input: {
                name: user.name.split(' ')[0],
                lastName: user.name.split(' ')[1] || '',
                email: user.email,
                photo: user.picture,
              },
            },
          });
          setCheck(true);
        } catch (error) {
          // console.log(error);
          setCheck(true);
        }
      }
    }
  }, [isLoading, isAuthenticated, user]);

  // Once there is account it verifies if account has been verified email, if it is then set token and navigate
  useEffect(async () => {
    if (check && user) {
      try {
        const { data } = await authenticateUserVer({
          variables: {
            input: {
              email: user.email,
            },
          },
        });
        const { token } = data.authenticateUserVer;
        setTokens(token);
        localStorage.setItem('token', token);
        setVerif(true);
        setTimeout(() => {
          navigate('/');
        }, 5000);
      } catch (error) {
        // console.log(error);
        setLoading(false);
        logout({ returnTo: window.location.origin });
        dispatch(actions.closeSesion());
      }
    }
  }, [check]);
  // console.log(user);

  const [getUser] = useLazyQuery(USER_BY_TOKEN, {
    variables: { token: tokens },
  });

  // Set in store the user data obtained from token
  useEffect(async () => {
    if (check && user) {
      try {
        const response = await getUser();
        dispatch(actions.obtainedUser(response.data.getUserByToken));
      } catch (error) {
        // console.log(error);
      }
    }
  }, [verif]);

  return (
    <div className="auth">
      {loadingp ? (
        <div className="loader">
          <div className="loader__spinner">
            <div />
          </div>
          <span className="loader__text">Loading</span>
        </div>
      ) : null}
      {loadingp ? null : (
        <div className="auth__text">Please verify your email</div>
      )}
      <div />
    </div>
  );
}

export default Auth;
