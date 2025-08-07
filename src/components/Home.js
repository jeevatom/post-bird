import React, { useState } from 'react';

const Home = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [view, setView] = useState('login');

  const logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.href = '/login';
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Your login logic here
    console.log('Logging in with:', loginEmail);
  };

  return (
    <div className="text-center mt-5">
      <div className="d-flex justify-content-center align-items-center vh-100 animated-bg position-relative">
        <img src="/images/bird2.png" alt="Bird" className="floating-bird" />
        <div className="card p-5 shadow-lg auth-card glass-card animate-fade-big">
          <div className="text-center mb-4">
            <h1 className="fw-bold text-primary">PostBird</h1>
            <p className="text-muted">Delivering your digital messages with wings</p>
          </div>

          <div className="animate-fade">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Email Token"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />

              <div className="text-center">
                <button type="submit" className="btn btn-outline-primary w-100">Sign In</button>
              </div>
            </form>

            <div className="text-center mt-4">
              <small>
                Don't have an account?{' '}
                <button className="btn btn-link p-0" onClick={() => setView('register')}>
                  Register
                </button>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
