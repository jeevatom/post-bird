import React, { useState ,useEffect } from 'react';
import { getData } from '../utils/API';

const TokenGeneration = () => {
  const [mailtoken, setMailtoken] = useState('');
  const [copyMessage, setCopyMessage] = useState('');
  const [loading, setLoading] = useState(false);

    useEffect(() => {
    const savedToken = localStorage.getItem('mailToken'); 
    if (savedToken) {
      setMailtoken(savedToken);
    }
  }, []); 


  const funGenerateToken = async (e) => {

    setLoading(true); // Disable button
    setCopyMessage(''); // Reset copy message

    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await getData('mail/generateToken', token);
      setMailtoken(response.token);
      showMessage('Token generated!');
      localStorage.setItem('mailToken', response.token)
    } catch (error) {
      console.error('Error sending mail:', error);
    }finally {
    setLoading(false); // Re-enable button
  }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(mailtoken);
    showMessage('Data copied!');
  };

  const showMessage = (message) => {
    setCopyMessage(message);
    setTimeout(() => setCopyMessage(''), 2000);
  };

  return (
    <div className="text-center mt-5">
      <div className="d-flex justify-content-center align-items-center vh-100 animated-bg position-relative">
        <img src="/images/bird2.png" alt="Bird" className="floating-bird" />
        <div className="card p-5 shadow-lg auth-card glass-card animate-fade-big">
          <div className="text-center mb-4">
            <h1 className="fw-bold text-primary">Token Generation</h1>
          </div>

          <div className="animate-fade">
            <form onSubmit={funGenerateToken}>
              {/* Input + Copy Icon Group */}
              <div className="input-group mb-3 position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email Token"
                  value={mailtoken}
                  onChange={(e) => setMailtoken(e.target.value)}
                  readOnly
                />
                <span
                  className="input-group-text"
                  onClick={handleCopy}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: '#f1f1f1',
                    transition: 'background 0.3s',
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#e0e0e0')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = '#f1f1f1')}
                >
                  <img
                    src="/icons/copy.png"
                    alt="Copy Icon"
                    style={{ width: '20px', height: '20px' }}
                  />
                </span>

                {copyMessage && (
                  <div
                    style={{
                      color: 'green',
                      fontWeight: 'bold',
                      position: 'absolute',
                      top: '100%',
                      left: '10px',
                      animation: 'fadeInOut 2s ease',
                      fontSize: '0.9rem',
                    }}
                  >
                    {copyMessage}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  onClick={funGenerateToken}
                  disabled={loading}
                  className='btn btn-outline-success w-100'
                  style={{
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading ? 'Generating...' : 'Generate Email Token'}
                </button>

              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Fade animation style */}
      <style>
        {`
          @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(5px); }
            10% { opacity: 1; transform: translateY(0); }
            90% { opacity: 1; }
            100% { opacity: 0; transform: translateY(-5px); }
          }
        `}
      </style>
    </div>
  );
};

export default TokenGeneration;
