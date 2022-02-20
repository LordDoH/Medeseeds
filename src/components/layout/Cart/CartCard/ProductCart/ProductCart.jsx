import React from 'react';
import './ProductCart.scss';

function ProductCart({ product }) {
  const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });

  const shortTitle =
    product.title.length > 40
      ? `${product.title.slice(0, 40)}...`
      : product.title;

  const priceCurrency = formatterPeso.format(product.price);

  return (
    <div className="product_cart">
      <img
        src={product.image}
        alt="product_image"
        className="product_cart__img"
      />
      <div className="product_cart__brand">{product.brand}</div>
      <div className="product_cart__short_title">{shortTitle}</div>
      <div className="product_cart__price">{priceCurrency}</div>
    </div>
  );
}

export default ProductCart;
