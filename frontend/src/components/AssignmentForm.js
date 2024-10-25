// frontend/src/components/AssignmentForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AssignmentForm = ({ token }) => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('assignment', file);

    await axios.post('http://localhost:5000/api/assignments', formData, {
      headers: {
        'Authorization': token,
        'Content-Type': 'multipart/form-data',
      },
    });
    alert('Assignment submitted successfully');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Submit Assignment</button>
    </form>
  );
};

export default AssignmentForm;
