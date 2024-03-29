import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import ProductCard from '../Landing/ProductCard/ProductCard';
import DeliveryPolicy from '../../layout/DeliveryPolicy/DeliveryPolicy';
import GuaranteePolicy from '../../layout/GuaranteePolicy/GuaranteePolicy';

import './Products.scss';
import Spinner from '../../layout/Spinner/Spinner';
import Allied from '../../layout/Allied/Allied';
import WhatsappDock from '../../layout/WhatsappDock/WhatsappDock';
import UpsideDock from '../../layout/UpsideDock/UpsideDock';

const GET_PRODUCTS_BY_CATEGORY = gql`
  query getProductsByCategory($categoryTitle: String) {
    getProductsByCategory(categoryTitle: $categoryTitle) {
      id
      title
      description
      image
      brand
      price
    }
  }
`;

function Products() {
  const { category } = useParams();

  const products = useQuery(GET_PRODUCTS_BY_CATEGORY, {
    variables: { categoryTitle: category },
  });

  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.currentUser);

  return (
    <div className="products">
      <div className="products__title">Products</div>
      {currentUser.role === 'admin' || currentUser.role === 'sales' ? (
        <div className="products__create" onClick={() => navigate('create')}>
          Create New
        </div>
      ) : null}
      {!products.loading ? (
        <div className="products__cards">
          {products.data.getProductsByCategory.map((e) => (
            <ProductCard key={e.id} product={e} />
          ))}
        </div>
      ) : (
        <Spinner />
      )}

      {products.data?.getProductsByCategory.length > 10 ? (
        <button type="button" className="products__more_btn">
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

export default Products;
