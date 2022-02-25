import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation, gql } from '@apollo/client';
import Swal from 'sweetalert2';
import actions from '../../../store/action';
import OrderTable from './OrderTable/OrderTable';
import DeliveryPolicy from '../../layout/DeliveryPolicy/DeliveryPolicy';
import GuaranteePolicy from '../../layout/GuaranteePolicy/GuaranteePolicy';
import HelpSlice from '../../layout/HelpSlice/HelpSlice';

import './Order.scss';
import Allied from '../../layout/Allied/Allied';
import Input from '../../layout/Input/Input';
import useMercadoPago from '../../../hooks/useMercadoPago';
import WhatsappDock from '../../layout/WhatsappDock/WhatsappDock';
import UpsideDock from '../../layout/UpsideDock/UpsideDock';

const NEW_PAYMENT = gql`
  mutation newPayment($input: OrderInput) {
    newPayment(input: $input)
  }
`;

const NEW_ORDER = gql`
  mutation newOrder($input: OrderInput, $email: String) {
    newOrder(input: $input, email: $email) {
      id
      status
      total
      user
      products {
        productId
        quantity
        title
        unit_price
      }
    }
  }
`;

function Order() {
  const mercadopago = useMercadoPago(process.env.REACT_APP_MERCADOPAGO_KEY);

  const products = JSON.parse(localStorage.getItem('products'));

  const values = products?.map((e) => e.unit_price * e.quantity);

  const total = values?.reduce((a, b) => a + b) || 0;

  const [newPayment] = useMutation(NEW_PAYMENT);

  const [newOrder] = useMutation(NEW_ORDER);

  const cartState = useSelector((state) => state.cartState);

  useEffect(() => {}, [cartState]);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.currentUser);

  const [address, setAddress] = useState({
    field: user.address || '',
    check: null,
  });
  const [telephone, setTelephone] = useState({
    field: user.telephone || '',
    check: null,
  });

  const parameters = {
    address: /^.{10,50}$/,
    telephone: /^[0-9]{7,20}$/,
  };

  const payCart = async () => {
    const productsToken = JSON.parse(localStorage.getItem('products'));
    const token = localStorage.getItem('token');
    if (token) {
      if (productsToken) {
        const { data } = await newPayment({
          variables: {
            input: {
              products: productsToken,
            },
          },
        });
        const order = await newOrder({
          variables: {
            input: {
              total,
              address: address.field,
              telephone: telephone.field,
              products: productsToken,
              created: Date.now().toString(),
            },
            email: user.email,
          },
        });
        await dispatch(actions.editedOrder(order));
        const checkout = mercadopago.checkout({
          preference: {
            id: data.newPayment,
          },
        });

        checkout.open();
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Add some products to cart',
          confirmButtonText: 'Understood',
          timer: 2000,
          confirmButtonColor: '#739D38',
          imageUrl:
            'https://res.cloudinary.com/medeseeds/image/upload/v1645591577/shopping-basket_w7jr0w.png',
          imageWidth: 70,
        });
      }
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'You have to login first',
        confirmButtonText: 'Understood',
        timer: 4000,
        confirmButtonColor: '#739D38',
        icon: 'error',
        imageWidth: 70,
      });
    }
  };

  return (
    <div className="order">
      <div className="order__title">Order Resume</div>
      <OrderTable />
      <div className="order__hint">
        Help us with some data to complete your order request, remember you can
        modify your order from your Cart
      </div>
      <div className="order__input">Address</div>
      <Input
        state={address}
        changeState={setAddress}
        inputType="text"
        label="Address"
        textPlaceholder="Type your address"
        inputName="address"
        errorText="Please insert a valid address"
        inputParameters={parameters.address}
      />
      <div className="order__input">Phone</div>
      <Input
        state={telephone}
        changeState={setTelephone}
        inputType="text"
        label="Telephone"
        textPlaceholder="Type your telephone"
        inputName="telephone"
        errorText="Please insert a valid telephone"
        inputParameters={parameters.telephone}
      />
      <button type="button" className="order__pay_btn" onClick={payCart}>
        Pay now
      </button>
      <HelpSlice />
      <DeliveryPolicy />
      <GuaranteePolicy />
      <Allied />
      <WhatsappDock />
      <UpsideDock />
    </div>
  );
}

export default Order;
