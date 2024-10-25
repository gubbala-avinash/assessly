// frontend/src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (username.length < 3 || password.length < 6) {
      setError('Username must be at least 3 characters and password at least 6 characters.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/users/signup', { username, password });
      onSuccess();  // Call the onSuccess callback to redirect or update state
      alert('User created successfully');
      navigate('/'); // Redirect to login after successful signup
    } catch (error) {
      setError('Signup failed. Username might already be taken.');
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Signup</h2>
      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
