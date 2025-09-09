import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './pages/HomePage/HomePage';
import ProductPage from './pages/ProductPage/ProductPage';
import CartPage from './pages/CartPage/CartPage'; // new
import OrderPage from './pages/OrderPage/OrderPage'; // will create later
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminProductForm from './pages/admin/AdminProductForm';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import AdminLogin from './pages/admin/AdminLogin';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <Router>
      <NavBar />
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <main style={{ minHeight: '100vh', padding: '20px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<OrderPage />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route path="/admin/products" element={
            <PrivateRoute>
              <AdminProductsPage />
            </PrivateRoute>
          } />
          <Route path="/admin/products/new" element={
            <PrivateRoute>
              <AdminProductForm />
            </PrivateRoute>
          } />
          <Route path="/admin/products/:id/edit" element={
            <PrivateRoute>
              <AdminProductForm />
            </PrivateRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
