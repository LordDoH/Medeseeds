import React, { useEffect, useState } from 'react';
import { useQuery, useLazyQuery, useMutation, gql } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { BiImageAdd } from 'react-icons/bi';
import axios from 'axios';
import Swal from 'sweetalert2';
import actions from '../../../store/action';
import './EditProfile.scss';

import SetProducts from '../../layout/setProducts/SetProducts';
import HelpSlice from '../../layout/HelpSlice/HelpSlice';
import Allied from '../../layout/Allied/Allied';
import Input from '../../layout/Input/Input';
import Spinner from '../../layout/Spinner/Spinner';
import WhatsappDock from '../../layout/WhatsappDock/WhatsappDock';
import UpsideDock from '../../layout/UpsideDock/UpsideDock';

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

const UPDATE_USER = gql`
  mutation updateUser($updateUserId: ID!, $input: ProfileInput) {
    updateUser(id: $updateUserId, input: $input) {
      token
    }
  }
`;

const USER_BY_TOKEN = gql`
  query getUserByToken($token: String!) {
    getUserByToken(token: $token) {
      email
      lastName
      name
      role
      id
      photo
      address
      telephone
    }
  }
`;

const DELETE_PICTURE = gql`
  mutation deletePhoto($photo: String) {
    deletePhoto(photo: $photo)
  }
`;

function EditProfile() {
  const products = useQuery(GET_PRODUCTS_LIKED);
  const [updateUser] = useMutation(UPDATE_USER);
  const [deletePhoto] = useMutation(DELETE_PICTURE);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.currentUser);

  useEffect(() => {}, []);

  const [image, setImage] = useState({ field: user.photo, check: null });

  const [counter, setCounter] = useState(0);

  const onChangeFile = async (e) => {
    e.preventDefault();
    if (counter > 0) {
      await deletePhoto({
        variables: {
          photo: image.field,
        },
      });
    }

    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', process.env.REACT_APP_CLOUD_PRESET);
    formData.append('cloud_name', process.env.REACT_APP_CLOUD_NAME);
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
      formData
    );
    setImage({ ...image, field: res.data.url });
    const high = counter + 1;
    setCounter(high);
  };

  const [active, setActive] = useState(false);

  const [name, setName] = useState({
    field: user?.name || '',
    check: null,
  });
  const [lastName, setLastName] = useState({
    field: user?.lastName || '',
    check: null,
  });
  const [address, setAddress] = useState({
    field: user?.address || '',
    check: null,
  });
  const [telephone, setTelephone] = useState({
    field: user?.telephone || '',
    check: null,
  });
  const [email, setEmail] = useState({
    field: user?.email || '',
    check: null,
  });
  const [cPassword, setcPassword] = useState({
    field: '',
    check: null,
  });
  const [password, setPassword] = useState({
    field: '',
    check: null,
  });
  const [password2, setPassword2] = useState({
    field: '',
    check: null,
  });

  const parameters = {
    name: /^.[a-zA-Z]{4,20}$/,
    lastName: /^.[a-zA-Z]{4,25}$/,
    telephone: /^[0-9]{7,20}$/,
    address: /^.{10,50}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^.{4,20}$/,
  };

  const checkPassword2 = () => {
    if (password.field.length > 0) {
      if (password.field !== password2.field) {
        setPassword2((prevState) => ({ ...prevState, check: 'false' }));
      } else {
        setPassword2((prevState) => ({ ...prevState, check: 'true' }));
      }
    }
  };

  const [getUserByToken] = useLazyQuery(USER_BY_TOKEN, {
    variables: { token: localStorage.getItem('token') },
  });

  const saveChanges = async () => {
    if (password2.check === 'false' || password.check === 'false') {
      Swal.fire({
        title: 'Error!',
        text: 'Verify your passwords',
        confirmButtonText: 'Understood',
        timer: 4000,
        confirmButtonColor: '#739D38',
        icon: 'error',
        imageWidth: 70,
      });
    } else if (!password2.check && !password.check) {
      if (
        name.check === 'true' &&
        lastName.check === 'true' &&
        email.check === 'true' &&
        address.check === 'true' &&
        telephone.check === 'true'
      ) {
        const userUp = await updateUser({
          variables: {
            input: {
              name: name.field,
              lastName: lastName.field,
              email: email.field,
              address: address.field,
              telephone: telephone.field,
              photo: image.field,
            },
            updateUserId: user.id,
          },
        });
        Swal.fire({
          title: 'Success!',
          text: 'Your changes were successful',
          confirmButtonText: 'Understood',
          timer: 4000,
          confirmButtonColor: '#739D38',
          icon: 'success',
          imageWidth: 70,
        });
        localStorage.setItem('token', userUp.data.updateUser.token);
        const response = await getUserByToken();
        await dispatch(actions.obtainedUser(response.data.getUserByToken));
        return userUp;
      }
    }
    if (
      password.check === 'true' &&
      password2.check === 'true' &&
      name.check === 'true' &&
      lastName.check === 'true' &&
      email.check === 'true' &&
      address.check === 'true' &&
      telephone.check === 'true'
    ) {
      const userUp = await updateUser({
        variables: {
          input: {
            name: name.field,
            lastName: lastName.field,
            email: email.field,
            address: address.field,
            telephone: telephone.field,
            password: password.field,
            photo: image.field,
          },
          updateUserId: user.id,
        },
      });
      Swal.fire({
        title: 'Success!',
        text: 'Your changes were successful',
        confirmButtonText: 'Understood',
        timer: 4000,
        confirmButtonColor: '#739D38',
        icon: 'success',
        imageWidth: 70,
      });

      localStorage.setItem('token', userUp.data.updateUser.token);
      const response = await getUserByToken();
      await dispatch(actions.obtainedUser(response.data.getUserByToken));
      return userUp;
    }
    Swal.fire({
      title: 'Error!',
      text: 'Complete and verify all the fields',
      confirmButtonText: 'Understood',
      timer: 4000,
      confirmButtonColor: '#739D38',
      icon: 'error',
      imageWidth: 70,
    });
    return null;
  };

  return (
    <div className="edit_profile">
      {!products.loading && user ? (
        <div className="edit_profile__user_card">
          <div className="edit_profile__user_card__photo">
            <img src={image.field} alt="" />
            <label htmlFor="comPhoto" onChange={onChangeFile}>
              <input
                type="file"
                name="comPhoto"
                id="comPhoto"
                accept="image/*"
                multiple
              />
              <div>
                <BiImageAdd />
              </div>
            </label>
          </div>
          <div className="edit_profile__user_card__role">{user.role}</div>
          <div className="edit_profile__user_card__info">
            <div className="edit_profile__user_card__info__col">
              <div className="edit_profile__user_card__info__col__data">
                <span className="edit_profile__user_card__info__col__data__title">
                  Name
                </span>
                <span className="edit_profile__user_card__info__col__data__description">
                  <Input
                    state={name}
                    changeState={setName}
                    inputType="text"
                    label="Name"
                    textPlaceholder="Type your name"
                    inputName="name"
                    errorText="Please insert a valid name"
                    inputParameters={parameters.name}
                  />
                </span>
              </div>
              <div className="edit_profile__user_card__info__col__data">
                <span className="edit_profile__user_card__info__col__data__title">
                  Last Name
                </span>
                <span className="edit_profile__user_card__info__col__data__description">
                  <Input
                    state={lastName}
                    changeState={setLastName}
                    inputType="text"
                    label="LastName"
                    textPlaceholder="Type your last name"
                    inputName="lastName"
                    errorText="Please insert a valid last name"
                    inputParameters={parameters.lastName}
                  />
                </span>
              </div>
              <div className="edit_profile__user_card__info__col__data">
                <span className="edit_profile__user_card__info__col__data__title">
                  Address
                </span>
                <span className="edit_profile__user_card__info__col__data__description">
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
                </span>
              </div>
            </div>
            <div className="edit_profile__user_card__info__col">
              <div className="edit_profile__user_card__info__col__data">
                <span className="edit_profile__user_card__info__col__data__title">
                  Phone
                </span>
                <span className="edit_profile__user_card__info__col__data__description">
                  <Input
                    state={telephone}
                    changeState={setTelephone}
                    inputType="text"
                    label="Telephone"
                    textPlaceholder="Type your Phone"
                    inputName="telephone"
                    errorText="Please insert a valid Phone"
                    inputParameters={parameters.telephone}
                  />
                </span>
              </div>
              <div className="edit_profile__user_card__info__col__data">
                <span className="edit_profile__user_card__info__col__data__title">
                  Email
                </span>
                <span className="edit_profile__user_card__info__col__data__description">
                  <Input
                    state={email}
                    changeState={setEmail}
                    inputType="email"
                    label="Email"
                    textPlaceholder="Type your Email"
                    inputName="email"
                    errorText="Please insert a valid Email"
                    inputParameters={parameters.email}
                  />
                </span>
              </div>
              <div className="edit_profile__user_card__info__col__data">
                <span className="edit_profile__user_card__info__col__data__title">
                  Password
                </span>
                <button
                  type="button"
                  className="edit_profile__user_card__info__col__data__change_btn"
                  onClick={() => setActive(!active)}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
          <div
            className={`edit_profile__user_card__change_pwd ${
              active ? 'active' : null
            }`}
          >
            <div className="edit_profile__user_card__change_pwd__label">
              Current Password
            </div>
            <Input
              state={cPassword}
              changeState={setcPassword}
              inputType="password"
              label="CurrentPassword"
              textPlaceholder="Type your current password"
              inputName="currentPassword"
              errorText="Please insert a valid password"
            />
            <div className="edit_profile__user_card__change_pwd__label">
              New Password
            </div>
            <Input
              state={password}
              changeState={setPassword}
              inputType="password"
              label="Password"
              textPlaceholder="Type your new password"
              inputName="password"
              errorText="Please insert a valid Password"
              inputParameters={parameters.password}
            />
            <div className="edit_profile__user_card__change_pwd__label">
              Confirm Password
            </div>
            <Input
              state={password2}
              changeState={setPassword2}
              inputType="password"
              label="Password2"
              textPlaceholder="Type again your new password"
              inputName="password2"
              errorText="Your password don't match"
              functionx={checkPassword2}
            />
          </div>
          <button
            type="button"
            className="edit_profile__user_card__save_btn"
            onClick={saveChanges}
          >
            Save Changes
          </button>
        </div>
      ) : (
        <Spinner />
      )}

      <HelpSlice />
      <div className="edit_profile__title"> Liked Products </div>
      <SetProducts products={products.data?.getLikedProducts} />
      <Allied />
      <WhatsappDock />
      <UpsideDock />
    </div>
  );
}

export default EditProfile;
