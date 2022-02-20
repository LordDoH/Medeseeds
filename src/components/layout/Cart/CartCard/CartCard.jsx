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

  const priceCurrency = formatterPeso.format(product.price * quantity);

  const reduceProduct = () => {
    if (quantity > 1) {
      const less = quantity - 1;
      setQuantity(less);
    }
  };

  const addProduct = () => {
    const plus = quantity + 1;
    setQuantity(plus);
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
        <div className="cart_card__pricing__remove">Remove</div>
        <div className="cart_card__pricing__text">Subtotal</div>
        <div className="cart_card__pricing__total">{priceCurrency}</div>
      </div>
    </div>
  );
}

export default CartCard;
