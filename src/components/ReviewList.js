import React from 'react';

function ReviewList({ reviews }) {
  if (!reviews.length) return <p>No reviews yet.</p>;

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