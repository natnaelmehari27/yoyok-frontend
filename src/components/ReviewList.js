import { useEffect, useState } from "react";
import axios from "axios";

function ReviewList({ productId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/products/${productId}/reviews/`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Failed to load reviews", err));
  }, [productId]);

  if (reviews.length === 0) return <p>No reviews yet.</p>;

  return (
    <div>
      <h3>Reviews</h3>
      {reviews.map((review) => (
        <div key={review.id} style={{ borderBottom: "1px solid #ccc", marginBottom: "1rem" }}>
          <p><strong>Rating:</strong> {review.rating} / 5</p>
          <p>{review.comment}</p>
          <p style={{ fontSize: "0.9rem", color: "gray" }}>By user {review.user}</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;