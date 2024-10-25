// frontend/src/components/AssignmentList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Review from './Review';

const AssignmentList = ({ token }) => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      const response = await axios.get('http://localhost:5000/api/assignments', {
        headers: {
          'Authorization': token,
        },
      });
      setAssignments(response.data);
    };
    fetchAssignments();
  }, [token]);

  const refreshAssignments = async () => {
    const response = await axios.get('http://localhost:5000/api/assignments', {
      headers: {
        'Authorization': token,
      },
    });
    setAssignments(response.data);
  };

  return (
    <div>
      <h3>Assignments</h3>
      {assignments.map((assignment) => (
        <div key={assignment._id}>
          <p>Submitted by: {assignment.studentId.username}</p>
          {/* Update the download link here */}
          <a href={`http://localhost:5000/api/assignments/download/${assignment.filePath.split('/').pop()}`} download>
  Download Assignment
</a>


          <h4>Reviews:</h4>
          {assignment.reviews.map((review) => (
            <div key={review._id}>
              <p><strong>{review.reviewerId.username}:</strong> {review.review}</p>
            </div>
          ))}
          <Review assignmentId={assignment._id} token={token} onReviewSubmitted={refreshAssignments} />
        </div>
      ))}
    </div>
  );
};

export default AssignmentList;
