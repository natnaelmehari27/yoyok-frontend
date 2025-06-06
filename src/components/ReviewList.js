import React from "react";

function ReviewList({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <p>No reviews yet.</p>;
  }

  return (
    <section>
      <div>
        <h3>Reviews</h3>
        {reviews.map(({ id, rating, comment, user }) => (
          <div
            key={id}
            style={{
              borderBottom: "1px solid #ccc",
              marginBottom: "1rem",
              paddingBottom: "1rem",
            }}
          >
            <p>
              <strong>Rating:</strong> {rating} / 5
            </p>
            <p>{comment}</p>
            <p style={{ fontSize: "0.9rem", color: "gray" }}>
              By user{" "}
              {typeof user === "string" ? user : user?.username || "Anonymous"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ReviewList;
