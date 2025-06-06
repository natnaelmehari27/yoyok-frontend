import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/ProductCard.module.css'; // Adjust the path as necessary

function ProductCard({ product }) {
  return (
    <div className={styles.card}>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <Link to={`/products/${product.id}`}>View Details</Link>
    </div>
  );
}

export default ProductCard;
