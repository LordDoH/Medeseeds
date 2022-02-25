import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, gql } from '@apollo/client';
import { useDispatch } from 'react-redux';
import Allied from '../../layout/Allied/Allied';
import HelpSlice from '../../layout/HelpSlice/HelpSlice';
import './PaymentSuccess.scss';
import actions from '../../../store/action';
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

function PaymentSuccess() {
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

  const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });

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
                status: 'Paid',
              },
              updateOrderId: orders.data?.getOrdersByUser[0].id,
            },
          });
        } catch (e) {
          // console.log(e);
        }
        const products = localStorage.removeItem('products');
        dispatch(actions.loadedCart(products));
      }
    }
  }, [orders.loading]);

  return (
    <div className="payment_success">
      <div className="payment_success__text">
        Your payment has been <span>successful!</span>
      </div>
      <table className="payment_success__table">
        <thead>
          <tr className="payment_success__table__row_headers">
            <th colSpan={2}>Your payment resume</th>
          </tr>
        </thead>
        <tbody>
          <tr className="payment_success__table__row">
            <td className="payment_success__table__row__title">Local ID</td>
            <td className="payment_success__table__row__data">
              {orders.data?.getOrdersByUser[0].id}
            </td>
          </tr>
          <tr className="payment_success__table__row">
            <td className="payment_success__table__row__title">
              MercadoPago ID
            </td>
            <td className="payment_success__table__row__data">{mpId}</td>
          </tr>
          <tr className="payment_success__table__row">
            <td className="payment_success__table__row__title">
              Payment Method
            </td>
            <td className="payment_success__table__row__data cap">
              {mpMethod.replace('_', ' ')}
            </td>
          </tr>
          <tr className="payment_success__table__row">
            <td className="payment_success__table__row__title">Total paid</td>
            <td className="payment_success__table__row__data">
              {formatterPeso.format(orders.data?.getOrdersByUser[0].total)}
            </td>
          </tr>
          <tr className="payment_success__table__row">
            <td className="payment_success__table__row__title">Status</td>
            <td className="payment_success__table__row__data cap">
              {mpStatus}
            </td>
          </tr>
        </tbody>
      </table>
      <button className="payment_success__btn" type="button">
        Go Home
      </button>
      <HelpSlice />
      <Allied />
      <WhatsappDock />
      <UpsideDock />
    </div>
  );
}

export default PaymentSuccess;
