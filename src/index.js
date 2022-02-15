import React from 'react';
import ReactDOM from 'react-dom';
import './scss/main.scss';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';

ReactDOM.render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>,
  document.getElementById('root')
);
