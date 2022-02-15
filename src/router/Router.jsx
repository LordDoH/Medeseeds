import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';

// Elements
import Landing from '../components/pages/Landing/Landing';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Landing />} />
      </Route>
    </Routes>
  );
}

export default Router;
