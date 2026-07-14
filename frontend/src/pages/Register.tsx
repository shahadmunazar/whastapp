import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, User, Mail, Lock } from 'lucide-react';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/auth/register', { name, email, password, role });
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="py-5 d-flex align-items-center justify-content-center bg-light">
      <div className="card border-0 shadow-sm p-4" style={{ width: '400px' }}>
        <div className="text-center mb-4">
          <div className="bg-primary d-inline-block p-2 rounded mb-3">
            <LayoutDashboard className="text-white" size={32} />
          </div>
          <h2 className="fw-bold">Create Account</h2>
          <p className="text-muted">Start managing your WhatsApp projects</p>
        </div>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-0"><User size={18} /></span>
              <input 
                type="text" 
                className="form-control bg-light border-0" 
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
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
          <div className="mb-4">
            <label className="form-label">Role</label>
            <select 
              className="form-select bg-light border-0" 
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="superadmin">Superadmin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2 fw-bold mb-3">Register</button>
          <div className="text-center">
            <span className="text-muted">Already have an account? </span>
            <Link to="/login" className="text-primary fw-bold text-decoration-none">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
