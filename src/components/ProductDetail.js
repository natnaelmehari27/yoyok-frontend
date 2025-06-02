import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import ReviewList from '../components/ReviewList';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

   useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/products/${id}/`)
      .then(response => setProduct(response.data))
      .catch(error => console.error(error));

    axios.get(`http://127.0.0.1:8000/api/reviews/?product=${id}`)
      .then(res => setReviews(res.data));
  }, [id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    axios.post('http://127.0.0.1:8000/api/reviews/', {
      product: id,
      text: reviewText,
      rating: rating,
    })
    .then(res => {
      setReviews([...reviews, res.data]);
      setReviewText('');
      setRating(0);
    })
    .catch(err => console.error(err));
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

      <ReviewList productId={product.id} />

      <h3>Reviews</h3>
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
      <form onSubmit={handleReviewSubmit}>
        <label>
          Rating (0–5):
          <input
            type="number"
            value={rating}
            onChange={e => setRating(parseFloat(e.target.value))}
            min="0"
            max="5"
            step="0.5"
            required
          />
        </label>
        <br />
        <textarea
          placeholder="Your review..."
          value={reviewText}
          onChange={e => setReviewText(e.target.value)}
          required
        />
        <br />
        <button type="submit" disabled={!reviewText || rating <= 0}>Submit Review</button>
      </form>
    </div>
  );
}

export default ProductDetail;