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

function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Landing />} />
        <Route path="/activate/:hash" element={<Verify />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/any" element={<Products />} />
        <Route path="*" element={<P404 />} />
      </Route>
    </Routes>
  );
}

export default Router;
