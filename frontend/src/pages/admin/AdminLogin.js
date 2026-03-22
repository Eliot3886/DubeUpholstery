import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ShieldCheck } from 'lucide-react';
import './Admin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (username === 'dube' && password === 'dube2026!') {
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container glass-card animate-fade-in" style={{ padding: '1.5rem 2rem' }}>
        <div className="text-center mb-3">
          <div className="login-logo-wrapper mb-2">
             <img src="/logo.jpeg" alt="Dube Upholstery" className="login-brand-logo" />
          </div>
          <h2 className="logo-text" style={{fontSize: '1.2rem', color: '#fff', letterSpacing: '1px', marginBottom: '0.1rem'}}>Welcome to Dube Upholstery</h2>
          <span className="logo-subtext" style={{color: '#999', fontWeight: '500', letterSpacing: '1px', fontSize: '0.75rem'}}>Please login to continue</span>
        </div>

        {error && <div className="admin-error animate-fade-in py-2 my-2" style={{ fontSize: '0.8rem' }}>{error}</div>}

        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="form-group mb-3">
            <label className="admin-label">Username</label>
            <div className="admin-input-group">
              <User className="input-icon" size={16} />
              <input 
                type="text" 
                placeholder="Enter username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="admin-input"
                required 
                autoComplete="username"
              />
            </div>
          </div>

          <div className="form-group mb-3">
            <label className="admin-label">Password</label>
            <div className="admin-input-group">
              <Lock className="input-icon" size={16} />
              <input 
                type="password" 
                placeholder="Enter password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-input"
                required 
                autoComplete="current-password"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="spinner-border spinner-border-sm" role="status"></div>
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <ShieldCheck size={16} />
                <span>Log In</span>
              </>
            )}
          </button>
        </form>
        
        <div className="login-footer mt-4 text-center">
          <p className="text-white-50" style={{fontSize: '0.8rem'}}>
            &copy; {new Date().getFullYear()} Dube Upholstery. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
