import React, { useEffect, useState } from 'react';
import axios from '../api/axiosDefaults';
import ProductCard from '../components/ProductCard';
import styles from '../styles/HomePage.module.css';

function LoadingSpinner() {
  return (
    <div role="status" aria-live="polite" className={styles.spinner}>
      Loading products...
    </div>
  );
}

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      try {
        const res = await axios.get('/products/');
        if (isMounted) {
          setProducts(res.data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load products. Please try again later.');
          console.error('Error fetching products:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <LoadingSpinner />;

  if (error)
    return (
      <div role="alert" className={styles.error}>
        {error}
      </div>
    );

  return (
    <main className={styles.homeContainer}>
      <h1>Latest Products</h1>
      <section className={styles.grid}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}

export default HomePage;
