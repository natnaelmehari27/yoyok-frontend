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

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const renderPageNumbers = () => {
    let pages = [];

    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          className={`${styles.pageButton} ${i === currentPage ? styles.activePage : ''}`}
          onClick={() => onPageChange(i)}
          aria-current={i === currentPage ? "page" : undefined}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <nav className={styles.paginationContainer} aria-label="Product list pagination">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={styles.pageButton}
        aria-label="Previous Page"
      >
        &lt;
      </button>
      {renderPageNumbers()}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={styles.pageButton}
        aria-label="Next Page"
      >
        &gt;
      </button>
    </nav>
  );
}

function HomePage() {
  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchTerm, setSearchTerm] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    async function fetchProducts() {
      setLoading(true);
      try {
        const params = {
          page,
        };
        if (searchTerm.trim()) {
          params.search = searchTerm;
        }
        const res = await axios.get('/products', { params, cancelToken: source.token });
        if (isMounted) {
          setProducts(res.data.results || res.data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          if (axios.isCancel(err)) {
            // Request cancelled, do nothing
          } else {
            setError('Failed to load products. Please try again later.');
            console.error('Error fetching products:', err);
          }
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
      source.cancel();
    };
  }, [page, searchTerm]);

  // Handle form submit (prevent reload)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1); // Reset to page 1 on new search
  };

  return (
    <main className={styles.homeContainer}>
      <h1>Latest Products</h1>

      <form onSubmit={handleSearchSubmit} className={styles.searchForm} aria-label="Search Products" role='search'>
        <input
          type="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
          aria-label="Search products by name"
        />
        <button type="submit" className={styles.searchButton} aria-label="Search products">
          🔍
        </button>
      </form>

       {loading && <LoadingSpinner />}
      {error && (
        <div role="alert" className={styles.error}>
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <section className={styles.grid} aria-live="polite" aria-busy={loading}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </section>
          )}

          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}

    </main>
  );
}

export default HomePage;
