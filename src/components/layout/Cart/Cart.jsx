import React, { useEffect, useState } from 'react';
import './Cart.scss';
import { useSelector } from 'react-redux';
import CartCard from './CartCard/CartCard';

function Cart() {
  const [productData, setProductData] = useState([]);

  const cartState = useSelector((state) => state.cartState);

  useEffect(() => {
    const productsToken = JSON.parse(localStorage.getItem('products'));
    setProductData(productsToken);
  }, [cartState]);

  const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });

  // const values = fakeProductData.map((e) => e.price);

  // suma.reduce((a, b) => a + b)

  // const suma = values.reduce((a, b) => a + b);
  const suma = 100000;

  const subtotalCurrency = formatterPeso.format(suma / 1.19);
  const taxCurrency = formatterPeso.format((suma / 1.19) * 0.19);
  const totalCurrency = formatterPeso.format(suma);

  return (
    <div className="cart">
      {productData?.length !== 0 ? (
        productData?.map((e) => <CartCard product={e} />)
      ) : (
        <div className="cart__text">There is no products, Add some</div>
      )}
      <hr className="cart__line" />
      <div className="cart__totals">
        <div className="cart__totals__text">Subtotal</div>
        <div>{subtotalCurrency}</div>
      </div>
      <div className="cart__totals">
        <div className="cart__totals__text">Taxes</div>
        <div>{taxCurrency}</div>
      </div>
      <div className="cart__totals">
        <div className="cart__totals__text">Total</div>
        <div>{totalCurrency}</div>
      </div>
      <button type="button" className="cart__pay_btn">
        Pay
      </button>
    </div>
  );
}

export default Cart;
