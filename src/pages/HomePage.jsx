import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card p-5 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4"> Task Manager </h3>
        <button onClick={() => navigate('/login')} className="btn btn-primary w-100 mb-3">
          User / Customer Login
        </button>
        <button onClick={() => navigate('/admin-login')} className="btn btn-secondary w-100">
          Admin Login
        </button>
      </div>
    </div>
  );
}

export default HomePage;
