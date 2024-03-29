import React from 'react';
import ProductCard from '../../pages/Landing/ProductCard/ProductCard';
import './SetProducts.scss';

function SetProducts({ products }) {
  return (
    <div>
      <div className="setProducts">
        {products?.map((e) => (
          <ProductCard key={e.id} product={e} />
        ))}
      </div>
    </div>
  );
}

export default SetProducts;
