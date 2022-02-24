import React, { useEffect, useState } from 'react';
import './Cart.scss';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import CartCard from './CartCard/CartCard';

function Cart() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const payCart = async () => {
    const productsToken = JSON.parse(localStorage.getItem('products'));
    if (!productsToken) {
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
    } else {
      navigate('/orderresume');
    }
  };

  const [productData, setProductData] = useState([]);
  const [values, setValues] = useState([0, 0]);

  const cartState = useSelector((state) => state.cartState);

  useEffect(() => {
    const productsToken = JSON.parse(localStorage.getItem('products'));
    setProductData(productsToken);
    setValues(productsToken?.map((e) => e.unit_price * e.quantity));
  }, [cartState]);

  const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });

  const suma = values?.reduce((a, b) => a + b) || 0;

  const subtotalCurrency = formatterPeso.format(suma / 1.19);
  const taxCurrency = formatterPeso.format((suma / 1.19) * 0.19);
  const totalCurrency = formatterPeso.format(suma);

  return (
    <div className="cart">
      {productData ? (
        productData?.map((e) => (
          <CartCard key={`cart${e.productId}`} product={e} />
        ))
      ) : (
        <div className="cart__text">There are no products, Add some</div>
      )}
      <hr className="cart__line" />
      <div className="cart__totals">
        <div className="cart__totals__text">Subtotal</div>
        <div>{subtotalCurrency}</div>
      </div>
      <div className="cart__totals">
        <div className="cart__totals__text">Taxes</div>
        <div>{taxCurrency}</div>
      </div>
      <div className="cart__totals">
        <div className="cart__totals__text">Total</div>
        <div>{totalCurrency}</div>
      </div>
      <button type="button" className="cart__pay_btn" onClick={payCart}>
        Order
      </button>
    </div>
  );
}

export default Cart;
