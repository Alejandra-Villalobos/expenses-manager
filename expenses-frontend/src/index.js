import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Auth from './pages/Auth';
import Home from './pages/Home';
import Banks from './pages/Banks';
import Transactions from './pages/Transactions'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Auth/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/banks' element={<Banks/>}/>
      <Route path='/transactions' element={<Transactions/>}/>
    </Routes>
  </BrowserRouter>
);

