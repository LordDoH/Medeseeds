import React from 'react';
import './BranchCard.scss';

function BranchCard({ image }) {
  return <img src={image} alt="Branch logo" className="branch_card" />;
}

export default BranchCard;
