import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import './Verify.scss';

const VER_ACCOUNT = gql`
  mutation validateUser($input: ProfileInput) {
    validateUser(input: $input) {
      name
      verified
    }
  }
`;

function Verify() {
  const { hash } = useParams();
  const [validateUser] = useMutation(VER_ACCOUNT);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);
    try {
      await validateUser({
        variables: {
          input: {
            passwordResetToken: hash,
          },
        },
      });
      setLoading(false);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      // console.log(error);
    }
  }, []);

  return (
    <div className="verify">
      {loading ? (
        <div className="loader">
          <div className="loader__spinner">
            <div />
          </div>
          <span className="loader__text">Loading</span>
        </div>
      ) : null}
      {loading ? null : (
        <div className="verify__text">
          ¡Welcome! <br /> Your account has been verified, you will be
          redirected
        </div>
      )}
      <div />
    </div>
  );
}

export default Verify;
