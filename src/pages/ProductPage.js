import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from "../components/ProductForm";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/products/')
      .then(res => setProducts(res.data));

    axios.get('http://127.0.0.1:8000/api/categories/')
      .then(res => setCategories(res.data));
  }, []);

    const filteredProducts = selectedCategory
    ? products.filter(p => p.category.name === selectedCategory)
    : products;

    const reloadProducts = () => {
       axios.get('http://127.0.0.1:8000/api/products/')
            .then(res => setProducts(res.data)); 
    }

    return (
    <div>
      <h2>Products</h2>

      <ProductForm onSuccess={reloadProducts} />

      <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
        <option value="">All Categories</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.name}>{cat.name}</option>
        ))}
      </select>

      <div>
        {filteredProducts.map(product => (
          <div key={product.id}>
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p><strong>Category:</strong> {product.category.name}</p>
            <p><strong>Price:</strong> ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;