import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  

   useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/products/${id}/`)
      .then(response => setProduct(response.data))
      .catch(error => console.error(error));

    axios.get(`http://127.0.0.1:8000/api/reviews/?product=${id}`)
      .then(res => setReviews(res.data));
  }, [id]);

   const handleAddReview = (newReview) => {
    setReviews([...reviews, newReview]);
  };

  if (!product) return <div>Loading...</div>;

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
      <ReviewList productId={product.id} />

      <h4>Leave a Review</h4>
      {reviews.length > 0 ? (
        reviews.map(review => (
          <div key={review.id}>
            <p><strong>Rating:</strong> {review.rating}</p>
            <p>{review.text}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}

      <h4>Leave a Review</h4>
      <ReviewForm productId={id} onReviewAdded={handleAddReview} />
    </div>
  );
}

export default ProductDetail;