import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SucessPage.css';

const SuccessPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>No data submitted</p>;

  return (
    <div className="success-container">
      <h2>Submitted Details</h2>
      <ul>
        {Object.entries(state).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : value}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/')}>Go Back</button>
    </div>
  );
};

export default SuccessPage;
