import React from 'react';
import logo from './logo.svg';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Container from '@mui/material/Container';
import  Product from "./features/products/Product";
import ProductDetails from './features/products/ProductDetails';
import Cart from "./features/cart/Cart";
import {useSelector} from 'react-redux';
import "react-toastify/dist/ReactToastify.css";


function App() {
  const {cartList,status,error} = useSelector((state) =>state.cart)
 
  return (
    <div>
      <Header />
      <Container maxWidth="lg" sx={{ paddingTop: '100px' }}>
      
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetails />}></Route>
          <Route path="/mycart" element={<Cart />}></Route>  
        </Routes>
      </Container>


    </div>
  );
}

export default App;
