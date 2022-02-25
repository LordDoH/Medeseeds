import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useLazyQuery, gql } from '@apollo/client';
import { useSelector } from 'react-redux';
import { MdModeEdit } from 'react-icons/md';

import './Profile.scss';
import { useNavigate } from 'react-router-dom';
import SetProducts from '../../layout/setProducts/SetProducts';
import HelpSlice from '../../layout/HelpSlice/HelpSlice';
import Allied from '../../layout/Allied/Allied';

const GET_PRODUCTS_LIKED = gql`
  query getLikedProducts {
    getLikedProducts {
      id
      title
      description
      image
      brand
      price
    }
  }
`;

const ORDERS_BY_USER = gql`
  query getOrdersByUser {
    getOrdersByUser {
      id
      status
      total
      created
      mercadoPagoId
    }
  }
`;

const UPDATE_ORDERS = gql`
  mutation {
    updateOrders {
      status
      mercadoPagoId
    }
  }
`;

function Profile() {
  const products = useQuery(GET_PRODUCTS_LIKED);

  const navigate = useNavigate();

  const [active, setActive] = useState(false);

  const [orders, setOrders] = useState();

  const [updateOrders] = useMutation(UPDATE_ORDERS);

  const [getOrders] = useLazyQuery(ORDERS_BY_USER);

  useEffect(async () => {
    try {
      await updateOrders();
      await getOrders();
    } catch (e) {
      // console.log(e);
    }
  }, []);

  const onClick = async () => {
    const getorders = await getOrders();
    setOrders(getorders.data.getOrdersByUser);
    if (!active) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  const user = useSelector((state) => state.currentUser);

  const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });

  return (
    <div className="profile">
      <div className="profile__user_card">
        <div className="profile__user_card__photo">
          <img src={user.photo} alt="" />
        </div>
        <div className="profile__user_card__role">{user.role}</div>
        <div
          className="profile__user_card__icon"
          onClick={() => navigate('/editprofile')}
        >
          <MdModeEdit />
        </div>
        <div className="profile__user_card__info">
          <div className="profile__user_card__info__col">
            <div className="profile__user_card__info__col__data">
              <span className="profile__user_card__info__col__data__title">
                Name
              </span>
              <span className="profile__user_card__info__col__data__description">
                {user.name}
              </span>
            </div>
            <div className="profile__user_card__info__col__data">
              <span className="profile__user_card__info__col__data__title">
                Last Name
              </span>
              <span className="profile__user_card__info__col__data__description">
                {user.lastName || 'No Last Name'}
              </span>
            </div>
            <div className="profile__user_card__info__col__data">
              <span className="profile__user_card__info__col__data__title">
                Address
              </span>
              <span className="profile__user_card__info__col__data__description">
                {user.address || 'No Address'}
              </span>
            </div>
          </div>
          <div className="profile__user_card__info__col">
            <div className="profile__user_card__info__col__data">
              <span className="profile__user_card__info__col__data__title">
                Phone
              </span>
              <span className="profile__user_card__info__col__data__description">
                {user.telephone || 'No Phone'}
              </span>
            </div>
            <div className="profile__user_card__info__col__data">
              <span className="profile__user_card__info__col__data__title">
                Email
              </span>
              <span className="profile__user_card__info__col__data__description">
                {user.email || ''}
              </span>
            </div>
            <div className="profile__user_card__info__col__data">
              <span className="profile__user_card__info__col__data__title">
                Password
              </span>
              <button
                type="button"
                className="profile__user_card__info__col__data__change_btn"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
        <div className="profile__user_card__order">Orders</div>
        <button
          type="button"
          className="profile__user_card__order_btn"
          onClick={onClick}
        >
          {!active ? 'View Orders' : 'Hide Orders'}
        </button>
        <div className={`profile__tableshow ${active ? 'active' : null}`}>
          <table className="profile__user_card__table">
            <thead className="profile__user_card__table__head">
              <tr>
                <th className="profile__user_card__table__head__title id">
                  Date
                </th>
                <th className="profile__user_card__table__head__title">Id</th>
                <th className="profile__user_card__table__head__title">
                  Status
                </th>
                <th className="profile__user_card__table__head__title">Paid</th>
              </tr>
            </thead>
            <tbody className="profile__user_card__table__body">
              {orders ? (
                orders?.map((e) => {
                  const dateE = new Date(Number(e.created));
                  return (
                    <tr key={e.id}>
                      <td className="profile__user_card__table__body__data id">
                        {dateE.toDateString()}
                      </td>
                      <td className="profile__user_card__table__body__data">
                        {e.id}
                      </td>
                      <td className="profile__user_card__table__body__data">
                        {e.status}
                      </td>
                      <td className="profile__user_card__table__body__data">
                        {formatterPeso.format(e.total)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="profile__user_card__table__body__data"
                  >
                    You have no orders, make your first order nows 🛒
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <HelpSlice />
      <div className="profile__title"> Liked Products </div>
      <SetProducts products={products.data?.getLikedProducts} />
      <Allied />
    </div>
  );
}

export default Profile;
