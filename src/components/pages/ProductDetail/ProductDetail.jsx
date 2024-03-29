import React, { useEffect, useState } from 'react';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery, gql } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import actions from '../../../store/action';
import './ProductDetail.scss';
import HelpSlice from '../../layout/HelpSlice/HelpSlice';
import DeliveryPolicy from '../../layout/DeliveryPolicy/DeliveryPolicy';
import GuaranteePolicy from '../../layout/GuaranteePolicy/GuaranteePolicy';
import Allied from '../../layout/Allied/Allied';
import SetProducts from '../../layout/setProducts/SetProducts';
import WhatsappDock from '../../layout/WhatsappDock/WhatsappDock';
import UpsideDock from '../../layout/UpsideDock/UpsideDock';
import Spinner from '../../layout/Spinner/Spinner';

const GET_PRODUCT_BY_ID = gql`
  query getProduct($getProductId: ID!) {
    getProduct(id: $getProductId) {
      id
      title
      description
      brand
      image
      secondaryImages
      price
    }
  }
`;

const GET_PRODUCTS_LATEST = gql`
  query getLatestProducts {
    getLatestProducts {
      id
      title
      description
      image
      brand
      price
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation deleteProduct($deleteProductId: ID!) {
    deleteProduct(id: $deleteProductId)
  }
`;

function ProductDetail() {
  const { category, productId } = useParams();

  const { data, loading } = useQuery(GET_PRODUCT_BY_ID, {
    variables: {
      getProductId: productId,
    },
  });

  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  const navigate = useNavigate();

  const productos = useQuery(GET_PRODUCTS_LATEST);

  const productData = data?.getProduct;

  const dispatch = useDispatch();

  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    setMainImage(productData?.image);
  }, [productData]);

  const [quantity, setQuantity] = useState(1);

  const getProduct = (e) => e.title === productData?.title;

  const reduceProduct = () => {
    if (quantity > 1) {
      const less = quantity - 1;
      setQuantity(less);
    }
  };

  const addProduct = () => {
    const plus = quantity + 1;
    setQuantity(plus);
  };

  const addCart = () => {
    if (!localStorage.getItem('products')) {
      let products = [
        {
          title: productData.title,
          brand: productData.brand,
          unit_price: productData.price,
          quantity,
          image: productData.image,
          productId: productData.id,
        },
      ];
      products = JSON.stringify(products);
      localStorage.setItem('products', products);
      dispatch(actions.loadedCart(products));
    } else if (localStorage.getItem('products')) {
      let products = JSON.parse(localStorage.getItem('products'));
      if (products.find(getProduct)) {
        products.find(getProduct).quantity =
          products.find(getProduct).quantity + quantity;
        products = JSON.stringify(products);
        localStorage.setItem('products', products);
        dispatch(actions.loadedCart(products));
      } else {
        products.push({
          title: productData.title,
          brand: productData.brand,
          unit_price: productData.price,
          quantity,
          image: productData.image,
          productId: productData.id,
        });
        products = JSON.stringify(products);
        localStorage.setItem('products', products);
        dispatch(actions.loadedCart(products));
      }
    }
  };

  const onClickImage = (e) => {
    if (e === 2) {
      setMainImage(productData.image);
    } else {
      setMainImage(productData.secondaryImages[e]);
    }
  };

  const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });
  // eslint-disable-next-line
  const priceCurrency = formatterPeso.format(productData?.price * quantity);

  const currentUser = useSelector((state) => state.currentUser);

  const editProduct = async () => {
    await dispatch(actions.editedProduct(data.getProduct));
    navigate(`/categories/${category}/edit/${productId}`);
  };

  const delProduct = async () => {
    Swal.fire({
      title: 'Please confirm!',
      text: 'Do you want to delete this product?',
      confirmButtonText: 'Yes',
      showCancelButton: true,
      confirmButtonColor: '#739D38',
      icon: 'question',
      imageWidth: 70,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct({
          variables: {
            deleteProductId: productId,
          },
        });
        Swal.fire({
          title: 'Success!',
          text: 'The product has been deleted',
          confirmButtonText: 'Great',
          confirmButtonColor: '#739D38',
          icon: 'success',
          imageWidth: 70,
        });
        const datic = currentUser;
        datic.loading = true;
        navigate(`/categories/${category}/`);
        window.location.reload();
      }
    });
  };

  return (
    <div className="product_detail">
      {!loading ? (
        <div className="product_detail__card">
          {currentUser.role === 'admin' || currentUser.role === 'sales' ? (
            <div className="product_detail__card__options">
              <div onClick={editProduct}>Edit</div>
              <div onClick={delProduct}>Delete</div>
            </div>
          ) : null}
          <div className="product_detail__card__images">
            <img
              src={mainImage}
              alt=""
              className="product_detail__card__images__main"
            />
            <div className="product_detail__card__images__secondary">
              <img
                onClick={() => onClickImage(2)}
                src={productData.image}
                alt=""
                className="product_detail__card__images__secondary__element"
              />

              <img
                onClick={() => onClickImage(0)}
                src={productData.secondaryImages[0]}
                alt=""
                className="product_detail__card__images__secondary__element"
              />

              <img
                onClick={() => onClickImage(1)}
                src={productData.secondaryImages[1]}
                alt=""
                className="product_detail__card__images__secondary__element"
              />
            </div>
          </div>
          <div className="product_detail__card__information">
            <div className="product_detail__card__information__title">
              {productData.title}
            </div>
            <div className="product_detail__card__information__brand">
              {productData.brand}
            </div>
            <div className="product_detail__card__information__shopper">
              <div className="product_detail__card__information__shopper__price">
                {priceCurrency}
              </div>
              <div className="product_detail__card__information__shopper__quantity">
                Quantity
              </div>
              <div className="product_detail__card__information__shopper__setquantity">
                <div
                  onClick={reduceProduct}
                  className="product_detail__card__information__shopper__setquantity__btn"
                >
                  -
                </div>
                <div className="product_detail__card__information__shopper__setquantity__text">
                  {quantity}
                </div>
                <div
                  onClick={addProduct}
                  className="product_detail__card__information__shopper__setquantity__btn"
                >
                  +
                </div>
              </div>
              <button
                type="button"
                className="product_detail__card__information__shopper__shop_btn"
                onClick={addCart}
              >
                Add to cart <MdOutlineShoppingCart />
              </button>
            </div>
            <div className="product_detail__card__information__description">
              {productData.description}
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
      <HelpSlice />

      {!productos.loading ? (
        <>
          <div className="product_detail__related_title"> Related </div>
          <SetProducts products={productos?.data?.getLatestProducts} />
        </>
      ) : null}

      <DeliveryPolicy />
      <GuaranteePolicy />
      <Allied />
      <WhatsappDock />
      <UpsideDock />
    </div>
  );
}

export default ProductDetail;
