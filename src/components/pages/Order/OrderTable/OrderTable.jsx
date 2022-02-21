import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './OrderTable.scss';

function OrderTable() {
  const [products, setProducts] = useState();

  const cartState = useSelector((state) => state.cartState);

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem('products')));
  }, [cartState]);

  const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });

  const values = products?.map((e) => e.unit_price * e.quantity);

  const total = values.reduce((a, b) => a + b);

  return (
    <div>
      {products ? (
        <div className="order_table">
          {products.map((e) => (
            <div className="order_table__row">
              <div className="order_table__row__image">
                <img src={e.image} alt="" />
              </div>
              <div className="order_table__row__quantity">{e.quantity}</div>
              <div className="order_table__row__subtotal">
                {formatterPeso(e.quantity * e.unit_price)}
              </div>
            </div>
          ))}
          <div className="order_table__row">
            <div className="order_table__row__total">Total: </div>
            <div className="order_table__row__totalvalue">
              {formatterPeso(total)}{' '}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default OrderTable;
