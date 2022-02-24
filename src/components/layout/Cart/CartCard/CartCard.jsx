import React, { useEffect, useState } from 'react';
import './CartCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import ProductCart from './ProductCart/ProductCart';
import actions from '../../../../store/action';

function CartCard({ product }) {
  const [quantity, setQuantity] = useState(product.quantity);

  const cartState = useSelector((state) => state.cartState);

  const getProduct = (e) => e.title === product.title;

  useEffect(() => {
    const productsToken = JSON.parse(localStorage.getItem('products'));
    if (productsToken) {
      const productn = productsToken.find(getProduct);
      setQuantity(productn.quantity);
    }
  }, [cartState]);

  const dispatch = useDispatch();

  const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });

  const priceCurrency = formatterPeso.format(product.unit_price * quantity);

  const reduceProduct = () => {
    if (quantity > 1) {
      const less = quantity - 1;
      setQuantity(less);
      if (localStorage.getItem('products')) {
        let products = JSON.parse(localStorage.getItem('products'));
        if (products.find(getProduct)) {
          products.find(getProduct).quantity =
            products.find(getProduct).quantity - 1;
          products = JSON.stringify(products);
          localStorage.setItem('products', products);
          dispatch(actions.loadedCart(products));
        }
      }
    }
    if (quantity === 1) {
      if (localStorage.getItem('products')) {
        Swal.fire({
          title: 'Please confirm!',
          text: 'Do you want to remove this product?',
          confirmButtonText: 'Yes',
          showCancelButton: true,
          confirmButtonColor: '#739D38',
          icon: 'question',
          imageWidth: 70,
        }).then((result) => {
          if (result.isConfirmed) {
            let products = JSON.parse(localStorage.getItem('products'));
            if (products.length === 1) {
              localStorage.removeItem('products');
              dispatch(actions.loadedCart([]));
            } else if (products.find(getProduct)) {
              const indexP = products.findIndex(getProduct);
              products.splice(indexP, 1);
              products = JSON.stringify(products);
              localStorage.setItem('products', products);
              dispatch(actions.loadedCart(products));
            }
          }
        });
      }
    }
    // console.log(productsS);
  };

  const addProduct = () => {
    const plus = quantity + 1;
    setQuantity(plus);
    if (localStorage.getItem('products')) {
      let products = JSON.parse(localStorage.getItem('products'));
      if (products.find(getProduct)) {
        products.find(getProduct).quantity =
          products.find(getProduct).quantity + 1;
        products = JSON.stringify(products);
        localStorage.setItem('products', products);
        dispatch(actions.loadedCart(products));
      }
    }
  };

  const removeProduct = () => {
    if (localStorage.getItem('products')) {
      let products = JSON.parse(localStorage.getItem('products'));
      Swal.fire({
        title: 'Please confirm!',
        text: 'Do you want to remove this product?',
        confirmButtonText: 'Yes',
        showCancelButton: true,
        confirmButtonColor: '#739D38',
        icon: 'question',
        imageWidth: 70,
      }).then((result) => {
        if (result.isConfirmed) {
          if (products.length === 1) {
            localStorage.removeItem('products');
            dispatch(actions.loadedCart([]));
          } else if (products.find(getProduct)) {
            const indexP = products.findIndex(getProduct);
            products.splice(indexP, 1);
            products = JSON.stringify(products);
            localStorage.setItem('products', products);
            dispatch(actions.loadedCart(products));
          }
        }
      });
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
