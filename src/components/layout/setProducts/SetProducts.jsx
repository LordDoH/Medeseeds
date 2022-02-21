import React from 'react';
import ProductCard from '../../pages/Landing/ProductCard/ProductCard';
import './SetProducts.scss';

function SetProducts({ products }) {
  return (
    <div>
      <div className="setProducts">
        {products?.map((e) => (
          <ProductCard
            image={e.image}
            brand={e.brand}
            title={e.title}
            price={e.price}
          />
        ))}
      </div>
    </div>
  );
}

export default SetProducts;
