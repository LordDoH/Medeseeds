import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useSelector } from 'react-redux';
import { MdModeEdit } from 'react-icons/md';

import './Profile.scss';
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

function Profile() {
  const { data } = useQuery(GET_PRODUCTS_LIKED);

  const orders = useQuery(ORDERS_BY_USER);

  console.log(orders);

  const user = useSelector((state) => state.currentUser);

  // const formatterPeso = new Intl.NumberFormat('es-CO', {
  //   style: 'currency',
  //   currency: 'COP',
  //   minimumFractionDigits: 0,
  // });

  return (
    <div className="profile">
      <div className="profile__user_card">
        <div className="profile__user_card__photo">
          <img src={user.photo} alt="" />
        </div>
        <div className="profile__user_card__role">{user.role}</div>
        <div className="profile__user_card__icon">
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
        <table className="profile__user_card__table">
          <thead className="profile__user_card__table__head">
            <tr>
              <th className="profile__user_card__table__head__title">Date</th>
              <th className="profile__user_card__table__head__title">Id</th>
              <th className="profile__user_card__table__head__title">Status</th>
              <th className="profile__user_card__table__head__title">Paid</th>
            </tr>
          </thead>
          <tbody className="profile__user_card__table__body">
            <tr>
              <td className="profile__user_card__table__body__data">Hoy</td>
              <td className="profile__user_card__table__body__data">
                1232132131
              </td>
              <td className="profile__user_card__table__body__data">Paid</td>
              <td className="profile__user_card__table__body__data">45000</td>
            </tr>
          </tbody>
        </table>
      </div>

      <HelpSlice />
      <div className="profile__title"> Liked Products </div>
      <SetProducts products={data?.getLikedProducts} />
      <Allied />
    </div>
  );
}

export default Profile;
