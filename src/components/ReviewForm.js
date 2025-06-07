import { useState } from 'react';
import axiosInstance from '../api/axiosDefaults';
import '../styles/ReviewForm.module.css'; // Assuming you have some styles for the form

function ReviewForm({ productId, onReviewAdded }) {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || rating <= 0 || rating > 5) {
      setError('Please enter a valid rating between 1 and 5.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/reviews/', {
        product: productId,
        text: reviewText,
        rating: parseFloat(rating),
      });

      onReviewAdded?.(response.data);
      setReviewText('');
      setRating('');
    } catch (err) {
      setError('Failed to submit review.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rating (1–5):
        <input
          type="number"
          value={rating}
          onChange={e => setRating(parseFloat(e.target.value))}
          min="1"
          max="5"
          step="0.5"
          required
          disabled={submitting}
        />
      </label>
      <br />
      <textarea
        placeholder="Your review..."
        value={reviewText}
        onChange={e => setReviewText(e.target.value)}
        required
        disabled={submitting}
      />
      <br />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={!reviewText || !reviewText || !rating || rating <= 0}>
        {submitting ? 'Submitting...' : 'Submit Review'}
        </button>
    </form>
  );
}

export default ReviewForm;
