import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axiosInstance from '../api/axiosDefaults'; 
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProductAndReviews() {
      setLoading(true);
      setError(null);
      try {
        const [productRes, reviewsRes] = await Promise.all([
          axiosInstance.get(`/products/${id}/`),
          axiosInstance.get(`/reviews/?product=${id}`)
        ]);
        setProduct(productRes.data);
        setReviews(reviewsRes.data);
      } catch (err) {
        setError('Error fetching data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProductAndReviews();
  }, [id]);
   
   const handleAddReview = (newReview) => {
    setReviews([...reviews, newReview]);
  };

  if (loading) {
    return <div>Loading Product Details...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div>
      <div>
        <h2>{product.name}</h2>
        <p>Category: {product.category.name}</p>
        <p>Price: ${product.price}</p>
        <img 
          src={product.image ? product.image : 'https://via.placeholder.com/300'}
          alt={product.name}
           width="300"
        />
      </div>
      
      <h3>Reviews</h3>
      <ReviewList reviews={reviews} productId={product.id} />
      
      <h4>Leave a Review</h4>
      <ReviewForm productId={id} onReviewAdded={handleAddReview} />
    </div>
  );
}

export default ProductDetail;