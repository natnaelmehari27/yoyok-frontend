import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

   useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/products/${id}/`)
      .then(response => setProduct(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Category: {product.category.name}</p>
      <p>Price: ${product.price}</p>
      <img src={product.image} alt={product.name} width="300" />
    </div>
  );
}

export default ProductDetail;