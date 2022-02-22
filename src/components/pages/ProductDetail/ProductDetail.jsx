import React, { useEffect, useState } from 'react';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import actions from '../../../store/action';
import './ProductDetail.scss';
import HelpSlice from '../../layout/HelpSlice/HelpSlice';
import DeliveryPolicy from '../../layout/DeliveryPolicy/DeliveryPolicy';
import GuaranteePolicy from '../../layout/GuaranteePolicy/GuaranteePolicy';
import Allied from '../../layout/Allied/Allied';
// import Termo from '../../../assets/images/Termo.png';
import SetProducts from '../../layout/setProducts/SetProducts';

const GET_PRODUCT_BY_ID = gql`
  query getProduct($getProductId: ID!) {
    getProduct(id: $getProductId) {
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

function ProductDetail() {
  const { productId } = useParams();

  const { data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: {
      getProductId: productId,
    },
  });

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
          unit_price: productData.price,
          quantity,
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
          unit_price: productData.price,
          quantity,
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

  return (
    <div className="product_detail">
      {productData ? (
        <div className="product_detail__card">
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
      ) : null}
      <HelpSlice />
      <div className="product_detail__related_title"> Related </div>
      {!productos.loading ? (
        <SetProducts products={productos?.data?.getLatestProducts} />
      ) : null}

      <DeliveryPolicy />
      <GuaranteePolicy />
      <Allied />
    </div>
  );
}

export default ProductDetail;
