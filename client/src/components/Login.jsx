import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Importing CSS file

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log(username);
      console.log(password);

      const res = await axios.post("http://localhost:8000/user/login", {
        username: username,
        password: password,
      }, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });

      console.log(res.data); 
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("userId", res.data.user._id);
      navigate('/');
    } catch (err) {
      console.log(err.response ? err.response.data : err.message); 
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username</label>
          <input 
            type="text"
            className="form-input"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password"
            className="form-input"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
