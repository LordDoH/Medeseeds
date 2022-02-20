import React from 'react';
import './Cart.scss';
import Termo from '../../../assets/images/Termo.png';
import CartCard from './CartCard/CartCard';

function Cart() {
  const fakeProductData = [
    {
      image: Termo,
      title: 'Termohigrometro con sonda long. variable muy barato',
      brand: 'Cornwall',
      description:
        'El mejor del mercado controla la temperatura y los ciclos de humedad en tu cultivo, ideal para interiores, cuida tus plantas, evitando hongos por exceso de humedad o acaros por altas temperaturas',
      price: 75000,
    },
    {
      image: Termo,
      title: 'Termohigrometro con sonda long. variable muy barato',
      brand: 'Cornwall',
      description:
        'El mejor del mercado controla la temperatura y los ciclos de humedad en tu cultivo, ideal para interiores, cuida tus plantas, evitando hongos por exceso de humedad o acaros por altas temperaturas',
      price: 75000,
    },
    {
      image: Termo,
      title: 'Termohigrometro con sonda long. variable muy barato',
      brand: 'Cornwall',
      description:
        'El mejor del mercado controla la temperatura y los ciclos de humedad en tu cultivo, ideal para interiores, cuida tus plantas, evitando hongos por exceso de humedad o acaros por altas temperaturas',
      price: 75000,
    },
    {
      image: Termo,
      title: 'Termohigrometro con sonda long. variable muy barato',
      brand: 'Cornwall',
      description:
        'El mejor del mercado controla la temperatura y los ciclos de humedad en tu cultivo, ideal para interiores, cuida tus plantas, evitando hongos por exceso de humedad o acaros por altas temperaturas',
      price: 75000,
    },
    {
      image: Termo,
      title: 'Termohigrometro con sonda long. variable muy barato',
      brand: 'Cornwall',
      description:
        'El mejor del mercado controla la temperatura y los ciclos de humedad en tu cultivo, ideal para interiores, cuida tus plantas, evitando hongos por exceso de humedad o acaros por altas temperaturas',
      price: 75000,
    },
  ];

  const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });

  const values = fakeProductData.map((e) => e.price);

  // suma.reduce((a, b) => a + b)

  const suma = values.reduce((a, b) => a + b);

  const subtotalCurrency = formatterPeso.format(suma / 1.19);
  const taxCurrency = formatterPeso.format((suma / 1.19) * 0.19);
  const totalCurrency = formatterPeso.format(suma);

  return (
    <div className="cart">
      {fakeProductData.map((e) => (
        <CartCard product={e} />
      ))}
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
