import React from 'react';
import { useQuery, gql } from '@apollo/client';
import BranchCard from '../../pages/Landing/BranchCard/BranchCard';
import './Allied.scss';

const GET_BRANDS = gql`
  query getBrands {
    getBrands {
      id
      logo
    }
  }
`;

function Allied() {
  const { data, loading } = useQuery(GET_BRANDS);
  return (
    <div>
      {loading ? null : (
        <div className="allied_brands">
          <div className="allied_brands__title">Allied Brands</div>
          <div className="allied_brands__cards">
            {data.getBrands.map((e) => (
              <BranchCard key={e.id} image={e.logo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Allied;
