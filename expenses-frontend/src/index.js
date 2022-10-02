import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import './App.css';

import Auth from './pages/Auth';
import Home from './pages/Home';
import Banks from './pages/Banks';
import Transactions from './pages/Transactions'
import NotFound from './pages/NotFound';

import AuthProvider from './context/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
  <BrowserRouter>
    <CookiesProvider>
      <React.StrictMode>
        <AuthProvider>
          <Routes>
            
            <Route index element={<Auth/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/banks' element={<Banks/>}/>
            <Route path='/transactions' element={<Transactions/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </AuthProvider>
      </React.StrictMode>
    </CookiesProvider>
  </BrowserRouter>
  
);

