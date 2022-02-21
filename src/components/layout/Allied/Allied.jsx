import React from 'react';
import { useQuery, gql } from '@apollo/client';
import BranchCard from '../../pages/Landing/BranchCard/BranchCard';
// import Topcrop from '../../../assets/images/Topcrop.png';
import './Allied.scss';

const GET_BRANDS = gql`
  query getBrands {
    getBrands {
      logo
    }
  }
`;

// const fakeBranchData = [
//   { image: Topcrop },
//   { image: Topcrop },
//   { image: Topcrop },
//   { image: Topcrop },
//   { image: Topcrop },
//   { image: Topcrop },
//   { image: Topcrop },
//   { image: Topcrop },
// ];

function Allied() {
  const { data, loading } = useQuery(GET_BRANDS);
  return (
    <div>
      {loading ? null : (
        <div className="allied_brands">
          <div className="allied_brands__title">Allied Brands</div>
          <div className="allied_brands__cards">
            {data.getBrands.map((e) => (
              <BranchCard image={e.logo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Allied;
