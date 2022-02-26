import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useSelector } from 'react-redux';
import CategoryCard2 from './CategoryCard/CategoryCard2';
import DeliveryPolicy from '../../layout/DeliveryPolicy/DeliveryPolicy';
import GuaranteePolicy from '../../layout/GuaranteePolicy/GuaranteePolicy';
import './Categories.scss';
import Allied from '../../layout/Allied/Allied';
import Spinner from '../../layout/Spinner/Spinner';
import WhatsappDock from '../../layout/WhatsappDock/WhatsappDock';
import UpsideDock from '../../layout/UpsideDock/UpsideDock';

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

  const currentUser = useSelector((state) => state.currentUser);

  return (
    <div className="categories">
      <div className="categories__title">Categories</div>
      {currentUser.role === 'admin' || currentUser.role === 'sales' ? (
        <div className="categories__create">Create New</div>
      ) : null}

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
      <WhatsappDock />
      <UpsideDock />
    </div>
  );
}

export default Categories;
