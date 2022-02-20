import React, { useState } from 'react';
import './CartCard.scss';
import ProductCart from './ProductCart/ProductCart';

function CartCard({ product }) {
  const [quantity, setQuantity] = useState(1);

  const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });

  const productsToken = JSON.parse(localStorage.getItem('products'));

  const [productsS, setProductsS] = useState(productsToken);

  const priceCurrency = formatterPeso.format(product.price * quantity);

  const getProduct = (e) => e.product === product.title;

  const reduceProduct = () => {
    if (quantity > 1) {
      const less = quantity - 1;
      setQuantity(less);
      if (localStorage.getItem('products')) {
        let products = JSON.parse(localStorage.getItem('products'));
        if (products.find(getProduct)) {
          products.find(getProduct).quantity =
            products.find(getProduct).quantity - 1;
          setProductsS(products);
          products = JSON.stringify(products);
          localStorage.setItem('products', products);
        }
      }
    }
    if (quantity === 1) {
      if (localStorage.getItem('products')) {
        let products = JSON.parse(localStorage.getItem('products'));
        if (products.find(getProduct)) {
          const indexP = products.findIndex(getProduct);
          products.splice(indexP, 1);
          setProductsS(products);
          products = JSON.stringify(products);
          localStorage.setItem('products', products);
        }
      }
    }
    console.log(productsS);
  };

  const addProduct = () => {
    const plus = quantity + 1;
    setQuantity(plus);
    if (localStorage.getItem('products')) {
      let products = JSON.parse(localStorage.getItem('products'));
      if (products.find(getProduct)) {
        products.find(getProduct).quantity =
          products.find(getProduct).quantity + 1;
        setProductsS(products);
        products = JSON.stringify(products);
        localStorage.setItem('products', products);
      }
    }
  };

  const removeProduct = () => {
    if (localStorage.getItem('products')) {
      let products = JSON.parse(localStorage.getItem('products'));
      if (products.find(getProduct)) {
        const indexP = products.findIndex(getProduct);
        products.splice(indexP, 1);
        setProductsS(products);
        products = JSON.stringify(products);
        localStorage.setItem('products', products);
      }
    }
  };

  return (
    <div className="cart_card">
      <ProductCart product={product} />
      <div className="cart_card__pricing">
        <div className="cart_card__pricing__quantity">
          <div
            onClick={reduceProduct}
            className="cart_card__pricing__quantity__btn"
          >
            -
          </div>
          <div className="cart_card__pricing__quantity__text">{quantity}</div>
          <div
            onClick={addProduct}
            className="cart_card__pricing__quantity__btn"
          >
            +
          </div>
        </div>
        <div className="cart_card__pricing__remove" onClick={removeProduct}>
          Remove
        </div>
        <div className="cart_card__pricing__text">Subtotal</div>
        <div className="cart_card__pricing__total">{priceCurrency}</div>
      </div>
    </div>
  );
}

export default CartCard;
