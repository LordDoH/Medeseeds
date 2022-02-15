import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';

// Elements
import Landing from '../components/pages/Landing/Landing';
import Categories from '../components/pages/Categories/Categories';
import Products from '../components/pages/Products/Products';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Landing />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/any" element={<Products />} />
        <Route path="*" element={<Products />} />
      </Route>
    </Routes>
  );
}

export default Router;
