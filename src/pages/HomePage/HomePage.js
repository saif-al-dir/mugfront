import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/productsSlice';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import Hero from '../../components/Hero';
import { useHead } from '../../hooks/useHead';

const HomePage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);


  const headElements = [
    'Mugstore Home Page', // Sets <title>
    {
      tag: 'meta',
      props: { name: 'description', content: 'Page description' }
    }
  ];
  useHead(headElements);

  // Update productsPerPage based on window width
  useEffect(() => {
    const updateProductsPerPage = () => {
      if (window.innerWidth < 925) {
        setProductsPerPage(6);
      } else if (window.innerWidth < 1122) {
        setProductsPerPage(8);
      } else {
        setProductsPerPage(10);
      }
    };

    updateProductsPerPage(); // initial check

    window.addEventListener('resize', updateProductsPerPage);
    return () => window.removeEventListener('resize', updateProductsPerPage);
  }, []);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Calculate total pages based on productsPerPage
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Ensure currentPage is not out of range if productsPerPage changes
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [productsPerPage, totalPages, currentPage]);

  if (status === 'loading') {
    return <div className={styles.container}>Loading products...</div>;
  }

  if (status === 'failed') {
    return <div className={styles.container}>Error: {error}</div>;
  }

  // Get products for current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

  // Render pagination dots
  const renderDots = () => {
    const dots = [];
    for (let i = 1; i <= totalPages; i++) {
      dots.push(
        <button
          key={i}
          className={`${styles.dot} ${currentPage === i ? styles.activeDot : ''}`}
          onClick={() => setCurrentPage(i)}
          aria-label={`Go to page ${i}`}
        >
          ●
        </button>
      );
    }
    return dots;
  };

  return (
    <div className={styles.container}>
      <Hero />
      <h1 className={styles.title}>Our Products</h1>
      <div className={styles.productsGrid}>
        {currentProducts.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img
              src={product.image}
              alt={product.title}
              className={styles.productImage}
            />
            <div className={styles.productInfo}>
              <h3 className={styles.productTitle}>{product.title}</h3>
              

              {product.salePrice ? (
                <p className={styles.price}>
                  <span className={styles.oldPrice}>{product.price} zł</span>
                  <span className={styles.salePrice}>{product.salePrice} zł</span>
                </p>
              ) : (
                  <p className={styles.productPrice}>From {product.price} zł</p>
              )}

              <Link to={`/product/${product.id}`}>
                <button className={styles.viewButton}>View Product</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>{renderDots()}</div>
    </div>
  );
};

export default HomePage;