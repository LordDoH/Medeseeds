import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';

// Elements
import Landing from '../components/pages/Landing/Landing';
import Categories from '../components/pages/Categories/Categories';
import Products from '../components/pages/Products/Products';
import P404 from '../components/pages/P404/P404';
import Auth from '../components/pages/Auth/Auth';
import Verify from '../components/pages/Auth/Verify';
import ProductDetail from '../components/pages/ProductDetail/ProductDetail';
import Order from '../components/pages/Order/Order';
import PaymentSuccess from '../components/pages/Order/PaymentSuccess';
import PaymentPending from '../components/pages/Order/PaymentPending';
import PaymentFailed from '../components/pages/Order/PaymentFailed';
import Profile from '../components/pages/Profile/Profile';
import EditProfile from '../components/pages/EditProfile/EditProfile';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Landing />} />
        <Route path="/activate/:hash" element={<Verify />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/learn" element={<Landing />} />
        <Route path="/learn/:post" element={<Landing />} />
        <Route path="/orderresume" element={<Order />} />
        <Route path="/orderresume/success" element={<PaymentSuccess />} />
        <Route path="/orderresume/pending" element={<PaymentPending />} />
        <Route path="/orderresume/failed" element={<PaymentFailed />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/create" element={<Categories />} />
        <Route path="/categories/edit" element={<Categories />} />
        <Route path="/categories/:category" element={<Products />} />
        <Route path="/categories/:category/create" element={<Products />} />
        <Route path="/categories/:category/edit" element={<Products />} />
        <Route
          path="/categories/:category/:productId"
          element={<ProductDetail />}
        />
        <Route path="*" element={<P404 />} />
      </Route>
    </Routes>
  );
}

export default Router;
