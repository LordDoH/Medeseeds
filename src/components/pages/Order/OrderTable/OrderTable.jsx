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

  const total = values?.reduce((a, b) => a + b) || 0;

  const totalCurrency = formatterPeso.format(total);
  const subtotalCurrency = formatterPeso.format(total / 1.19);
  const taxesCurrency = formatterPeso.format((total / 1.19) * 0.19);

  return (
    <>
      {products ? (
        <table className="order_table">
          <thead>
            <tr>
              <th className="order_table__header">Product</th>
              <th className="order_table__header">Quantity</th>
              <th className="order_table__header">Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((e) => (
              <tr className="order_table__row" key={`order${e.productId}`}>
                <td className="order_table__row__image">
                  <img src={e.image} alt="" />
                  <div>{e.title}</div>
                </td>
                <td className="order_table__row__quantity">{e.quantity}</td>
                <td className="order_table__row__subtotal">
                  {formatterPeso.format(e.quantity * e.unit_price)}
                </td>
              </tr>
            ))}
            <tr className="order_table__row">
              <td colSpan="2" className="order_table__row__total">
                Subtotal:
              </td>
              <td className="order_table__row__totalvalue">
                {subtotalCurrency}
              </td>
            </tr>
            <tr className="order_table__row">
              <td colSpan="2" className="order_table__row__total">
                Taxes:
              </td>
              <td className="order_table__row__totalvalue">{taxesCurrency}</td>
            </tr>
            <tr className="order_table__row">
              <td colSpan="2" className="order_table__row__total">
                Total:
              </td>
              <td className="order_table__row__totalvalue">{totalCurrency}</td>
            </tr>
          </tbody>
        </table>
      ) : null}
      {!products ? (
        <div className="error_order_table">First add some products to cart</div>
      ) : null}
    </>
  );
}

export default OrderTable;
