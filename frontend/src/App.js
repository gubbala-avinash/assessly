// frontend/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import AssignmentForm from './components/AssignmentForm';
import AssignmentList from './components/AssignmentList';

const App = () => {
  const [token, setToken] = useState('');

  return (
    <Router>
      <div>
        <h1>E-Learning Platform</h1>
        {!token ? (
          <Routes>
            <Route path="/" element={<Login setToken={setToken} />} />
            <Route path="/signup" element={<Signup onSuccess={() => setToken(token)} />} />
          </Routes>
        ) : (
          <>
            <AssignmentForm token={token} />
            <AssignmentList token={token} />
          </>
        )}
        <footer>
          <p>
            New user? <Link to="/signup">Sign up here</Link>
          </p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
