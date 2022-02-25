import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { MdOutlineShoppingCart } from 'react-icons/md';
import './ProductCard.scss';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import actions from '../../../../store/action';

const CATEGORY_BY_PRODUCTID = gql`
  query getCategoryTitleByProduct($id: ID!) {
    getCategoryTitleByProduct(id: $id)
  }
`;

function ProductCard({ product }) {
  const { data } = useQuery(CATEGORY_BY_PRODUCTID, {
    variables: { id: product.id },
  });

  const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });

  const dispatch = useDispatch();

  const shortTitle =
    product.title.length > 40
      ? `${product.title.slice(0, 40)}...`
      : product.title;

  const priceCurrency = formatterPeso.format(product.price);

  const getProduct = (e) => e.product === product.title;

  const onClick = () => {
    if (!localStorage.getItem('products')) {
      let products = [
        {
          title: product.title,
          brand: product.brand,
          unit_price: product.price,
          image: product.image,
          quantity: 1,
          productId: product.id,
        },
      ];
      products = JSON.stringify(products);
      localStorage.setItem('products', products);
      dispatch(actions.loadedCart(products));
    } else if (localStorage.getItem('products')) {
      let products = JSON.parse(localStorage.getItem('products'));
      if (products.find(getProduct)) {
        products.find(getProduct).quantity =
          products.find(getProduct).quantity + 1;
        products = JSON.stringify(products);
        localStorage.setItem('products', products);
        dispatch(actions.loadedCart(products));
      } else {
        products.push({
          title: product.title,
          brand: product.brand,
          unit_price: product.price,
          image: product.image,
          quantity: 1,
          productId: product.id,
        });
        products = JSON.stringify(products);
        localStorage.setItem('products', products);
        dispatch(actions.loadedCart(products));
      }
    }
  };

  const navigate = useNavigate();
  const linkto = () => {
    dispatch(actions.loadedRoute('/categories/product'));
    navigate(`/categories/${data.getCategoryTitleByProduct}/${product.id}`);
    window.scroll(0, 0);
  };
  return (
    <div className="product_card">
      <img
        src={product.image}
        alt="product_image"
        className="product_card__img"
        onClick={linkto}
      />
      <div className="product_card__brand">{product.brand}</div>
      <div className="product_card__short_title" onClick={linkto}>
        {shortTitle}
      </div>
      <div className="product_card__price">{priceCurrency}</div>
      <button type="button" className="product_card__btn" onClick={onClick}>
        Add to cart <MdOutlineShoppingCart />
      </button>
    </div>
  );
}

export default ProductCard;
