import { useState } from 'react';
import axios from 'axios';

function ReviewForm({ productId, onReviewAdded }) {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://127.0.0.1:8000/api/reviews/', {
      product: productId,
      text: reviewText,
      rating,
    })
    .then(res => {
      onReviewAdded(res.data);   
      setReviewText('');
      setRating(0);
    })
    .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
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
  );
}

export default ReviewForm;
