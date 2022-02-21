import React from 'react';
import BranchCard from '../../pages/Landing/BranchCard/BranchCard';
import Topcrop from '../../../assets/images/Topcrop.png';
import './Allied.scss';

const fakeBranchData = [
  { image: Topcrop },
  { image: Topcrop },
  { image: Topcrop },
  { image: Topcrop },
  { image: Topcrop },
  { image: Topcrop },
  { image: Topcrop },
  { image: Topcrop },
];

function Allied() {
  return (
    <div className="allied_branches">
      <div className="allied_branches__title">Allied Branches</div>
      <div className="allied_branches__cards">
        {fakeBranchData.map((e) => (
          <BranchCard image={e.image} />
        ))}
      </div>
    </div>
  );
}

export default Allied;
