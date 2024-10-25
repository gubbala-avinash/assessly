// frontend/src/components/Review.js
import React, { useState } from 'react';
import axios from 'axios';

const Review = ({ assignmentId, token, onReviewSubmitted }) => {
  const [review, setReview] = useState('');

  const handleReview = async () => {
    try {
      await axios.post(`http://localhost:5000/api/assignments/${assignmentId}/review`, { review }, {
        headers: {
          'Authorization': token,
        },
      });
      alert('Review submitted successfully');
      onReviewSubmitted();  // Call the function to refresh the assignment list
      setReview('');  // Clear the review input
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review here..."
      />
      <button onClick={handleReview}>Submit Review</button>
    </div>
  );
};

export default Review;
