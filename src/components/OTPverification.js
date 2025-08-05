import React, { useEffect, useRef, useState } from 'react';
import { postData } from '../utils/API';
import { useNavigate } from 'react-router-dom';

export default function OTPverification({ email, onSuccess }) { // ✅ Accept onSuccess prop
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [resendVisible, setResendVisible] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // Handle timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setResendVisible(true);
      return;
    }

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto move to next box
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');

    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Enter all 6 digits of the OTP.');
      return;
    }

    try {
      setVerifying(true);
      const payload = { username: email, otp: otpValue };
      const response = await postData('user/verifyotp', payload);
      
      console.log('OTP Response:', response); // ✅ Debug log
      
      // ✅ Check for the actual API response format
      if (response?.message === 'Otp Verified' || response?.message?.toLowerCase().includes('verified')) {
        setSuccess(true);
        setError(''); // Clear any previous errors
        
        // ✅ Call the parent's success handler after a short delay to show success message
        setTimeout(() => {
          if (onSuccess) {
            onSuccess();
          } else {
            // Fallback if no onSuccess prop provided
            navigate('/login');
          }
        }, 2000); // Show success message for 2 seconds before calling parent
      } else {
        setError(response?.message || 'OTP verification failed');
      }
    } catch (err) {
      console.error('OTP Verification Error:', err); // ✅ Debug log
      setError(err.message || 'Something went wrong');
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    setOtp(['', '', '', '', '', '']);
    setTimeLeft(300); // Restart timer
    setResendVisible(false);
    setError(''); // ✅ Clear any previous errors

    try {
      const response = await postData('user/resendotp', { username: email });
      if (response?.status !== 'success') {
        setError(response?.message || 'Failed to resend OTP');
      }
    } catch (err) {
      setError(err.message || 'Error while resending OTP');
    }
  };

  const formatTime = () => {
    const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const secs = (timeLeft % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4">OTP Verification</h2>
      <p>Enter the 6-digit OTP sent to <strong>{email}</strong></p>

      {success ? (
        <div className="text-center">
          <div className="alert alert-info mt-4 p-4">
            <h4 className="text-success mb-3">✅ Success!</h4>
            <p className="mb-0">OTP Verified Successfully!</p>
            <small className="text-muted">Redirecting you now...</small>
          </div>
        </div>
      ) : (
        <form onSubmit={handleVerify}>
          <div className="d-flex justify-content-center gap-2 mb-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                className="form-control text-center"
                style={{ width: '50px', fontSize: '20px' }}
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </div>

          {error && <div className="text-danger mb-3">{error}</div>}

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={verifying}
          >
            {verifying ? 'Verifying...' : 'Verify OTP'}
          </button>

          <div className="mt-3">
            {resendVisible ? (
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={handleResend}
              >
                🔁 Resend OTP
              </button>
            ) : (
              <small className="text-muted">Resend in {formatTime()}</small>
            )}
          </div>
        </form>
      )}
    </div>
  );
}