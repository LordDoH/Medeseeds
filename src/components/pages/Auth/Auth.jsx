import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

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

function Auth() {
  const [newUser] = useMutation(NEW_USER);
  const [authenticateUserVer] = useMutation(AUTH_BY_EMAIL);

  const { user, isLoading, isAuthenticated } = useAuth0();
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        localStorage.setItem('token', token);
        navigate('/');
      } catch (error) {
        // console.log(error);
        setLoading(false);
      }
    }
  }, [check, user]);
  // console.log(user);

  return (
    <div className="auth">
      {loading ? (
        <div className="loader">
          <div className="loader__spinner">
            <div />
          </div>
          <span className="loader__text">Loading</span>
        </div>
      ) : null}
      {loading ? null : (
        <div className="auth__text">Please verify your email</div>
      )}
      <div />
    </div>
  );
}

export default Auth;
