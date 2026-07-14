import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, Mail, Lock } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      if (res.data.user.role === 'superadmin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="py-5 d-flex align-items-center justify-content-center bg-light">
      <div className="card border-0 shadow-sm p-4" style={{ width: '400px' }}>
        <div className="text-center mb-4">
          <div className="bg-primary d-inline-block p-2 rounded mb-3">
            <LayoutDashboard className="text-white" size={32} />
          </div>
          <h2 className="fw-bold">Login to Dasher</h2>
          <p className="text-muted">Enter your credentials to continue</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-0"><Mail size={18} /></span>
              <input 
                type="email" 
                className="form-control bg-light border-0" 
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-0"><Lock size={18} /></span>
              <input 
                type="password" 
                className="form-control bg-light border-0" 
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2 fw-bold mb-3">Login</button>
          <div className="text-center">
            <span className="text-muted">Don't have an account? </span>
            <Link to="/register" className="text-primary fw-bold text-decoration-none">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
