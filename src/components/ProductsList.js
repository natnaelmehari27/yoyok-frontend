import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/products/')
      .then(response => setProducts(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Category ID: {product.category}</p> {/* category is likely an ID, not an object */}
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;