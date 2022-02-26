import React from 'react';
import { useNavigate } from 'react-router-dom';
import Plantation from '../../../assets/images/Plantation.gif';
import './PostUnique.scss';

function PostUnique() {
  const navigate = useNavigate();
  return (
    <div className="post_unique">
      <div className="post_unique__information">
        <img
          src={Plantation}
          alt="No resource"
          className="post_unique__information__image"
        />
        <div className="post_unique__information__desc">
          We are planting a tree, come back later and harvest the crops
        </div>
      </div>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="post_unique__go_back_btn"
      >
        Go Back
      </button>
    </div>
  );
}

export default PostUnique;
