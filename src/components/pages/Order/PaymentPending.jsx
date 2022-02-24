import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, gql } from '@apollo/client';
import { useDispatch } from 'react-redux';
import Allied from '../../layout/Allied/Allied';
import HelpSlice from '../../layout/HelpSlice/HelpSlice';
import './PaymentPending.scss';
import actions from '../../../store/action';

const ORDERS_BY_USER = gql`
  query getOrdersByUser {
    getOrdersByUser {
      id
      mercadoPagoId
      total
    }
  }
`;

const UPDATE_ORDER = gql`
  mutation updateOrder($updateOrderId: ID!, $input: OrderInput) {
    updateOrder(id: $updateOrderId, input: $input) {
      status
    }
  }
`;

function PaymentPending() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orders = useQuery(ORDERS_BY_USER);

  const [updateOrder] = useMutation(UPDATE_ORDER);

  // Codigo para obtener los parametros entregados por mercado pago
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const mpId = urlParams.get('payment_id');
  const mpStatus = urlParams.get('status');
  const mpMethod = urlParams.get('payment_type');

  useEffect(async () => {
    if (!mpId || !localStorage.getItem('products')) {
      navigate('/');
    } else if (!orders.data?.getOrdersByUser[0].mercadoPagoId) {
      if (!orders.loading) {
        await updateOrder({
          variables: {
            input: {
              mercadoPagoId: mpId.toString(),
              status: 'InProcess',
            },
            updateOrderId: orders.data?.getOrdersByUser[0].id,
          },
        });
        const products = localStorage.removeItem('products');
        dispatch(actions.loadedCart(products));
      }
    }
  }, [orders.loading]);

  const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });

  return (
    <div className="payment_pending">
      <div className="payment_pending__text">
        Your payment is <span>pending</span> for approval, you can check its
        status in your profile
      </div>
      <table className="payment_pending__table">
        <thead>
          <tr className="payment_pending__table__row_headers">
            <th colSpan={2}>Your payment resume</th>
          </tr>
        </thead>
        <tbody>
          <tr className="payment_pending__table__row">
            <td className="payment_pending__table__row__title">Local ID</td>
            <td className="payment_pending__table__row__data">
              {orders.data?.getOrdersByUser[0].id}
            </td>
          </tr>
          <tr className="payment_pending__table__row">
            <td className="payment_pending__table__row__title">
              MercadoPago ID
            </td>
            <td className="payment_pending__table__row__data">{mpId}</td>
          </tr>
          <tr className="payment_pending__table__row">
            <td className="payment_pending__table__row__title">
              Payment Method
            </td>
            <td className="payment_pending__table__row__data cap">
              {mpMethod.replace('_', ' ')}
            </td>
          </tr>
          <tr className="payment_pending__table__row">
            <td className="payment_pending__table__row__title">Total paid</td>
            <td className="payment_pending__table__row__data">
              {formatterPeso.format(orders.data?.getOrdersByUser[0].total)}
            </td>
          </tr>
          <tr className="payment_pending__table__row">
            <td className="payment_pending__table__row__title">Status</td>
            <td className="payment_pending__table__row__data cap">
              {mpStatus.replace('_', ' ')}
            </td>
          </tr>
        </tbody>
      </table>
      <button className="payment_pending__btn" type="button">
        Go Home
      </button>
      <HelpSlice />
      <Allied />
    </div>
  );
}

export default PaymentPending;
