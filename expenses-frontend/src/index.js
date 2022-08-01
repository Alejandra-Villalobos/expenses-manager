import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Auth from './pages/Auth';
import Home from './pages/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Auth/>}/>
      <Route path='/home' element={<Home/>}/>
    </Routes>
  </BrowserRouter>
);

