import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';  // Import directly
import  SignupPage  from './pages/SignupPage';  
import "./App.css";
import Home from './pages/Home';
import CreateProduct from './pages/CreateProduct';
import MyProducts from './pages/MyProducts';
// import cart from './pages/cart';
import Cart from './pages/cart';
import ProductDetails from './pages/ProductsDetails';
import Profile from './pages/profile';
import CreateAddress from './pages/createAddress';



const App = () => {
  return (
    <>
    {/* <h1 className='text-red-400'>Hi</h1> */}
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/createproduct" element={<CreateProduct />} />
        <Route path="/createproduct/:id" element={<CreateProduct />} />
        <Route path="/myproducts" element={<MyProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-address" element={<CreateAddress />} />
     
      </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;
