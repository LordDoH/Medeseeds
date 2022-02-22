import React from 'react';
import { useQuery, gql } from '@apollo/client';
import CategoryCard2 from './CategoryCard/CategoryCard2';
import DeliveryPolicy from '../../layout/DeliveryPolicy/DeliveryPolicy';
import GuaranteePolicy from '../../layout/GuaranteePolicy/GuaranteePolicy';
import './Categories.scss';
import Allied from '../../layout/Allied/Allied';
import Spinner from '../../layout/Spinner/Spinner';

const GET_CATEGORIES = gql`
  query getCategories {
    getCategories {
      id
      title
      description
      image
    }
  }
`;

function Categories() {
  const categories = useQuery(GET_CATEGORIES);

  return (
    <div className="categories">
      <div className="categories__title">Categories</div>
      {categories.loading ? (
        <Spinner />
      ) : (
        <div className="categories__cards">
          {categories.data.getCategories.map((e) => (
            <CategoryCard2 key={e.id} image={e.image} title={e.title} />
          ))}
        </div>
      )}

      {categories.data?.getCategories.length > 10 ? (
        <button type="button" className="categories__more_btn">
          More
        </button>
      ) : null}

      <DeliveryPolicy />
      <GuaranteePolicy />
      <Allied />
    </div>
  );
}

export default Categories;
