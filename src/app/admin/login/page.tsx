'use client';

import { useState, FormEvent } from 'react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        window.location.href = '/admin';
      } else {
        const data = await res.json().catch(() => null);
        setError(data?.error || 'Invalid email or password');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-glow" />
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <div className="admin-login-logo">
          <img src="/logo.svg" alt="VizEz" className="admin-login-logo-img" />
        </div>

        <h1 className="admin-login-title">Welcome back</h1>
        <p className="admin-login-subtitle">Sign in to your admin dashboard</p>

        {error && (
          <div className="admin-login-error" id="login-error" role="alert">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 5v3.5M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {error}
          </div>
        )}

        <div className="admin-login-field">
          <label htmlFor="login-email" className="admin-login-label">Email</label>
          <input
            id="login-email"
            type="email"
            className="admin-login-input"
            placeholder="admin@vizez.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            disabled={loading}
          />
        </div>

        <div className="admin-login-field">
          <label htmlFor="login-password" className="admin-login-label">Password</label>
          <input
            id="login-password"
            type="password"
            className="admin-login-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            disabled={loading}
          />
        </div>

        <button
          id="login-submit"
          type="submit"
          className={`admin-login-btn ${loading ? 'admin-login-btn-loading' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <span className="admin-login-spinner" />
          ) : null}
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
