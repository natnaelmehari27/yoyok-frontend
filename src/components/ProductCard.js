import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/ProductCard.module.css'; 

function ProductCard({ product }) {
  const { id, name, price } = product || {};

  return (
    <div className={styles.card} role="region" aria-label={`Product: ${name || 'Unknown'}`}>
      <h3>{name || 'Unnamed product'}</h3>
      <p>${typeof price === 'number' ? price.toFixed(2) : 'N/A'}</p>
      {id ? (
        <Link to={`/products/${id}`}>
          View Details
        </Link>
      ) : (
        <span>Unavailable</span>
      )}
    </div>
  );
}

export default ProductCard;
