import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, gql } from '@apollo/client';
import Allied from '../../layout/Allied/Allied';
import HelpSlice from '../../layout/HelpSlice/HelpSlice';
import './PaymentFailed.scss';
import WhatsappDock from '../../layout/WhatsappDock/WhatsappDock';
import UpsideDock from '../../layout/UpsideDock/UpsideDock';

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

function PaymentFailed() {
  const navigate = useNavigate();

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
        try {
          await updateOrder({
            variables: {
              input: {
                mercadoPagoId: mpId.toString(),
                status: 'Failed',
              },
              updateOrderId: orders.data?.getOrdersByUser[0].id,
            },
          });
        } catch (e) {
          // console.log(e);
        }
      }
    }
  }, [orders.loading]);

  return (
    <div className="payment_failed">
      <div className="payment_failed__text">
        Your payment has <span>failed</span>, please try again
      </div>
      <table className="payment_failed__table">
        <thead>
          <tr className="payment_failed__table__row_headers">
            <th colSpan={2}>Your payment resume</th>
          </tr>
        </thead>
        <tbody>
          <tr className="payment_failed__table__row">
            <td className="payment_failed__table__row__title">Local ID</td>
            <td className="payment_failed__table__row__data">No Order</td>
          </tr>
          <tr className="payment_failed__table__row">
            <td className="payment_failed__table__row__title">
              MercadoPago ID
            </td>
            <td className="payment_failed__table__row__data">{mpId}</td>
          </tr>
          <tr className="payment_failed__table__row">
            <td className="payment_failed__table__row__title">
              Payment Method
            </td>
            <td className="payment_failed__table__row__data cap">
              {mpMethod.replace('_', ' ')}
            </td>
          </tr>
          <tr className="payment_failed__table__row">
            <td className="payment_failed__table__row__title">Total paid</td>
            <td className="payment_failed__table__row__data">$ 0</td>
          </tr>
          <tr className="payment_failed__table__row">
            <td className="payment_failed__table__row__title">Status</td>
            <td className="payment_failed__table__row__data cap">{mpStatus}</td>
          </tr>
        </tbody>
      </table>
      <button className="payment_failed__btn" type="button">
        Go Home
      </button>
      <HelpSlice />
      <Allied />
      <WhatsappDock />
      <UpsideDock />
    </div>
  );
}

export default PaymentFailed;
