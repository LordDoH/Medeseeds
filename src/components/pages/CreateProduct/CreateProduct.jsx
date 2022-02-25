import React, { useEffect, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { BiImageAdd } from 'react-icons/bi';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import Input from '../../layout/Input/Input';
import './CreateProduct.scss';

const DELETE_PICTURE = gql`
  mutation deletePhoto($photo: String) {
    deletePhoto(photo: $photo)
  }
`;

const NEW_PRODUCT = gql`
  mutation newProduct($input: ProductInput, $title: String) {
    newProduct(input: $input, title: $title) {
      id
    }
  }
`;

function CreateProduct() {
  const currentUser = useSelector((state) => state.currentUser);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.role === 'user') {
      navigate('/');
    }
  }, []);

  const [deletePhoto] = useMutation(DELETE_PICTURE);
  const [newProduct] = useMutation(NEW_PRODUCT);

  const { category } = useParams();

  const [image1, setImage1] = useState({ field: '', check: null });
  const [image2, setImage2] = useState({ field: '', check: null });
  const [image3, setImage3] = useState({ field: '', check: null });

  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [counter3, setCounter3] = useState(0);

  const onChangeFile1 = async (e) => {
    e.preventDefault();
    if (counter1 > 0) {
      try {
        await deletePhoto({
          variables: {
            photo: image1.field,
          },
        });
      } catch (error) {
        // console.log(error)
      }
    }

    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', process.env.REACT_APP_CLOUD_PRESET);
    formData.append('cloud_name', process.env.REACT_APP_CLOUD_NAME);
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
      formData
    );
    setImage1({ ...image1, field: res.data.url, check: 'true' });
    const high = counter1 + 1;
    setCounter1(high);
  };

  const onChangeFile2 = async (e) => {
    e.preventDefault();
    if (counter2 > 0) {
      try {
        await deletePhoto({
          variables: {
            photo: image2.field,
          },
        });
      } catch (error) {
        // console.log(error)
      }
    }

    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', process.env.REACT_APP_CLOUD_PRESET);
    formData.append('cloud_name', process.env.REACT_APP_CLOUD_NAME);
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
      formData
    );
    setImage2({ ...image2, field: res.data.url, check: 'true' });
    const high = counter2 + 1;
    setCounter2(high);
  };

  const onChangeFile3 = async (e) => {
    e.preventDefault();
    if (counter3 > 0) {
      try {
        await deletePhoto({
          variables: {
            photo: image3.field,
          },
        });
      } catch (error) {
        // console.log(error)
      }
    }

    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', process.env.REACT_APP_CLOUD_PRESET);
    formData.append('cloud_name', process.env.REACT_APP_CLOUD_NAME);
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
      formData
    );
    setImage3({ ...image3, field: res.data.url, check: 'true' });
    const high = counter3 + 1;
    setCounter3(high);
  };

  const [title, setTitle] = useState({
    field: '',
    check: null,
  });
  const [brand, setBrand] = useState({
    field: '',
    check: null,
  });
  const [description, setDescription] = useState({
    field: '',
    check: null,
  });
  const [price, setPrice] = useState({
    field: '',
    check: null,
  });
  const [stock, setStock] = useState({
    field: '',
    check: null,
  });

  const parameters = {
    title: /^.{4,30}$/,
    brand: /^.{4,20}$/,
    description: /^.{20,150}$/,
    price: /^[0-9]{3,10}$/,
    stock: /^[0-9]{1,5}$/,
  };

  const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });

  const saveProduct = async () => {
    if (
      title.check === 'true' &&
      brand.check === 'true' &&
      description.check === 'true' &&
      price.check === 'true' &&
      stock.check === 'true' &&
      image1.check === 'true' &&
      image2.check === 'true' &&
      image3.check === 'true'
    ) {
      const response = await newProduct({
        variables: {
          input: {
            title: title.field,
            brand: brand.field,
            description: description.field,
            image: image1.field,
            secondaryImages: [image2.field, image3.field],
            price: Number(price.field),
            stock: Number(stock.field),
          },
          title: category,
        },
      });
      Swal.fire({
        title: 'Success!',
        text: 'The product has been created successfully',
        confirmButtonText: 'Great',
        timer: 4000,
        confirmButtonColor: '#739D38',
        icon: 'success',
        imageWidth: 70,
      });
      setTimeout(() => {
        navigate(`/categories/${category}/${response.data?.newProduct.id}`);
      }, 1500);
    }
  };

  return (
    <div className="create_product">
      <div className="create_product__title">Create Product</div>
      <div className="create_product__card">
        <div className="create_product__card__input">
          <div className="create_product__card__input__title">Title</div>
          <Input
            state={title}
            changeState={setTitle}
            inputType="text"
            label="Title"
            textPlaceholder="Type your title"
            inputName="title"
            errorText="Please insert a valid title"
            inputParameters={parameters.title}
          />
        </div>
        <div className="create_product__card__input">
          <div className="create_product__card__input__title">Brand</div>
          <Input
            state={brand}
            changeState={setBrand}
            inputType="text"
            label="Brand"
            textPlaceholder="Type your brand"
            inputName="brand"
            errorText="Please insert a valid brand"
            inputParameters={parameters.brand}
          />
        </div>
        <div className="create_product__card__input">
          <div className="create_product__card__input__title">Description</div>
          <Input
            state={description}
            changeState={setDescription}
            inputType="text"
            label="Description"
            textPlaceholder="Type your description"
            inputName="description"
            errorText="Please insert a valid description"
            inputParameters={parameters.description}
          />
        </div>
        <div className="create_product__card__input">
          <div className="create_product__card__input__title">Price</div>
          <Input
            state={price}
            changeState={setPrice}
            inputType="number"
            label="Price"
            textPlaceholder="Type your price"
            inputName="price"
            errorText="Please insert a valid price"
            inputParameters={parameters.price}
          />
        </div>
        <div className="create_product__card__input">
          <div className="create_product__card__input__title">Stock</div>
          <Input
            state={stock}
            changeState={setStock}
            inputType="number"
            label="Stock"
            textPlaceholder="Type your stock"
            inputName="stock"
            errorText="Please insert a valid stock"
            inputParameters={parameters.stock}
          />
        </div>
        <div className="create_product__card__input__images">
          <div className="create_product__card__input__images__card">
            <div className="create_product__card__input__images__card__title">
              Main Image
            </div>
            <label htmlFor="comPhoto1" onChange={onChangeFile1}>
              <input
                type="file"
                name="comPhoto1"
                id="comPhoto1"
                accept="image/*"
                multiple
              />
              <div
                className={`create_product__card__input__images__card__icon ${
                  image1.field !== '' ? 'checkimg' : null
                }`}
              >
                {image1.field === '' ? (
                  <BiImageAdd />
                ) : (
                  <BsFillCheckCircleFill />
                )}
              </div>
            </label>
          </div>
          <div className="create_product__card__input__images__card">
            <div className="create_product__card__input__images__card__title">
              Secondary Image
            </div>
            <label htmlFor="comPhoto2" onChange={onChangeFile2}>
              <input
                type="file"
                name="comPhoto2"
                id="comPhoto2"
                accept="image/*"
                multiple
              />
              <div
                className={`create_product__card__input__images__card__icon ${
                  image2.field !== '' ? 'checkimg' : null
                }`}
              >
                {image2.field === '' ? (
                  <BiImageAdd />
                ) : (
                  <BsFillCheckCircleFill />
                )}
              </div>
            </label>
          </div>
          <div className="create_product__card__input__images__card">
            <div className="create_product__card__input__images__card__title">
              Secondary Image
            </div>
            <label htmlFor="comPhoto3" onChange={onChangeFile3}>
              <input
                type="file"
                name="comPhoto3"
                id="comPhoto3"
                accept="image/*"
                multiple
              />
              <div
                className={`create_product__card__input__images__card__icon ${
                  image3.field !== '' ? 'checkimg' : null
                }`}
              >
                {image3.field === '' ? (
                  <BiImageAdd />
                ) : (
                  <BsFillCheckCircleFill />
                )}
              </div>
            </label>
          </div>
        </div>
      </div>
      <div className="create_product__title">Preview</div>
      <div className="product_detail__card">
        <div className="product_detail__card__images">
          <img
            src={image1.field}
            alt=""
            className="product_detail__card__images__main"
          />
          <div className="product_detail__card__images__secondary">
            <img
              src={image1.field}
              alt=""
              className="product_detail__card__images__secondary__element"
            />

            <img
              src={image2.field}
              alt=""
              className="product_detail__card__images__secondary__element"
            />

            <img
              src={image3.field}
              alt=""
              className="product_detail__card__images__secondary__element"
            />
          </div>
        </div>
        <div className="product_detail__card__information">
          <div className="product_detail__card__information__title">
            {title.field || 'Title'}
          </div>
          <div className="product_detail__card__information__brand">
            {brand.field || 'Brand'}
          </div>
          <div className="product_detail__card__information__shopper">
            <div className="product_detail__card__information__shopper__price">
              {formatterPeso.format(price.field)}
            </div>
            <div className="product_detail__card__information__shopper__quantity">
              Quantity
            </div>
            <div className="product_detail__card__information__shopper__setquantity">
              <div className="product_detail__card__information__shopper__setquantity__btn">
                -
              </div>
              <div className="product_detail__card__information__shopper__setquantity__text">
                0
              </div>
              <div className="product_detail__card__information__shopper__setquantity__btn">
                +
              </div>
            </div>
            <button
              type="button"
              className="product_detail__card__information__shopper__shop_btn"
            >
              Add to cart <MdOutlineShoppingCart />
            </button>
          </div>
          <div className="product_detail__card__information__description">
            {description.field || 'Description'}
          </div>
        </div>
      </div>
      <button
        type="button"
        className="create_product__save_btn"
        onClick={saveProduct}
      >
        Save Product
      </button>
    </div>
  );
}

export default CreateProduct;
