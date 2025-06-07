import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from "../api/axiosDefaults";
import '../styles/ProductList.module.css'; // Assuming you have some styles for the product list


function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get('/products/');
        setProducts(Array.isArray(response.data) ? response.data : response.data.results || []);
      } catch (err) {
        setError('Failed to load products.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) return <div style={{ color: "red" }}>{error}</div>;

  if (products.length === 0) return <div>No products available.</div>;

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h3>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </h3>
          <p>Category: {product.category?.name || "Uncategorized"}</p> 
          <p>Price: ${product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;