import React from 'react';
import { MdOutlineShoppingCart } from 'react-icons/md';
import './ProductCard.scss';

function ProductCard({ image, brand, title, price }) {
  const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });

  const shortTitle = title.length > 40 ? `${title.slice(0, 40)}...` : title;

  const priceCurrency = formatterPeso.format(price);

  const getProduct = (e) => e.product === title;

  const onClick = () => {
    if (!localStorage.getItem('products')) {
      let products = [{ product: title, quantity: 1 }];
      products = JSON.stringify(products);
      localStorage.setItem('products', products);
    } else if (localStorage.getItem('products')) {
      let products = JSON.parse(localStorage.getItem('products'));
      if (products.find(getProduct)) {
        products.find(getProduct).quantity =
          products.find(getProduct).quantity + 1;
        products = JSON.stringify(products);
        localStorage.setItem('products', products);
      } else {
        let products2 = [{ product: title, quantity: 1 }];
        products2 = JSON.stringify(products2);
        localStorage.setItem('products', products2);
      }
    }
  };

  return (
    <div className="product_card">
      <img src={image} alt="product_image" className="product_card__img" />
      <div className="product_card__brand">{brand}</div>
      <div className="product_card__short_title">{shortTitle}</div>
      <div className="product_card__price">{priceCurrency}</div>
      <button type="button" className="product_card__btn" onClick={onClick}>
        Add to cart <MdOutlineShoppingCart />
      </button>
    </div>
  );
}

export default ProductCard;
