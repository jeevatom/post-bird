import React from 'react';

const Home = () => {
  const logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.href = '/login';
  };
 
  return (
    <div className="text-center mt-5">
      <h1>Welcome to the Home Page! 🎉</h1>
      <button onClick={logout} className="btn btn-danger mt-3">Logout</button>
    </div>
  );
};

export default Home;
