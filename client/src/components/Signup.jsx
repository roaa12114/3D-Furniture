import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; // Importing CSS file
import API_BASE_URL from '../config.js';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/user/register`, {
        username: name, 
        email,
        password
      }, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });

      console.log(response.data);
      alert("Account created successfully! 🎉");
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      alert("Error creating account. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="form-input"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            className="form-input"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-input"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="signup-btn">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
