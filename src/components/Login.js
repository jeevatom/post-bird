import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { postData } from '../utils/API';
import OTPverification from './OTPverification';
import './Home';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import LoadingBird from './Loading';




export default function AuthCard() {
    const [view, setView] = useState('login');
    const [message, setMessage] = useState('');
    const [loginemail, setLoginEmail] = useState('');
    const [loginpassword, setLoginPassword] = useState('');
    const [registeremail, setRegisterEmail] = useState('');
    const [registerpassword, setRegisterPassword] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [errorModalMsg, setErrorModalMsg] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!loginemail || !loginpassword) {
            setErrorModalMsg('Please fill in email and password to continue.');
            setShowModal(true);
            return;
        }
        setIsLoading(true);
        try {
            const payload = {
                username: loginemail,
                password: loginpassword,
            };

            const response = await postData('user/login', payload);
            const data = await response.json(); 
            const token = data.token;

            if (!token) {
                throw new Error('No Token Received. Please try again');
            }

            localStorage.setItem('jwtToken', token);
            const decoded = jwtDecode(token);

            console.log("decoded>>>>>", decoded)

            setMessage(`Welcome  ${loginemail}!`);
            setView('success');
            setIsLoading(false);
            // Wait 2 seconds and redirect
            setTimeout(() => {
                navigate('/home');
            }, 2000);

        } catch (err) {
            console.log("login err", err)
            setErrorModalMsg(err.message || 'Login failed');
            setShowModal(true);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!registeremail || !registerpassword) {
            setErrorModalMsg('Please fill in email and password to continue.');
            setShowModal(true);
            return;
        }
        setIsLoading(true);
        try {
            const payload = {
                username: registeremail,
                password: registerpassword,
            };

           const responsecode = await postData('user/signup', payload);
           if(responsecode.status === 208){
           setErrorModalMsg('User Already Exists!');
            setShowModal(true);
            return false;
           }
            setUserEmail(registeremail);
            setView('otp');
        } catch (err) {
            setErrorModalMsg(err.message || 'Register failed');
            setShowModal(true);
        }finally{
               setIsLoading(false);
        };
    };

    const handleOTPSuccess = () => {
        setMessage('Verification successful! Redirecting to login...');
        setView('success');


        setTimeout(() => {
            setView('login');
            setMessage('');
        }, 5000);
    };
    return (
        <>
            {isLoading ? (
                <LoadingBird />
            ) : (
                <div className="d-flex justify-content-center align-items-center vh-100 animated-bg position-relative">
                    <img src="/images/bird2.png" alt="Bird" className="floating-bird" />
                    <div className="card p-5 shadow-lg auth-card glass-card animate-fade-big">
                        <div className="text-center mb-4">
                            <h1 className="fw-bold text-primary">PostBird</h1>
                            <p className="text-muted">Delivering your digital messages with wings</p>
                        </div>

                        {view === 'login' && (
                            <div className="animate-fade">
                                <h2 className="text-center mb-4">Login</h2>
                                <form onSubmit={handleLogin}>
                                    <input
                                        type="email"
                                        className="form-control mb-3 r"
                                        placeholder="Email"
                                        value={loginemail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        className="form-control mb-4 r"
                                        placeholder="Password"
                                        value={loginpassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                    />
                                    <div className='text-center'>
                                        <button type="submit" className="btn btn-outline-primary w-100">Sign In</button>
                                    </div>
                                </form>
                                <div className="text-center mt-4">
                                    <small>Don't have an account? <button className="btn btn-link p-0" onClick={() => setView('register')}>Register</button></small>
                                </div>
                            </div>
                        )}

                        {view === 'register' && (
                            <div className="animate-fade">
                                <h2 className="text-center mb-4">Register</h2>
                                <form onSubmit={handleRegister}>
                                    <input
                                        type="email"
                                        className="form-control mb-3 r"
                                        placeholder="Email"
                                        value={registeremail}
                                        onChange={(e) => setRegisterEmail(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        className="form-control mb-4 r"
                                        placeholder="Password"
                                        value={registerpassword}
                                        onChange={(e) => setRegisterPassword(e.target.value)}
                                    />
                                    <div className='text-center'>
                                        <button type="submit" className="btn btn-outline-success w-100">Register</button>
                                    </div>
                                </form>
                                <div className="text-center mt-4">
                                    <small>Already have an account? <button className="btn btn-link p-0" onClick={() => setView('login')}>Login</button></small>
                                </div>
                            </div>
                        )}

                        {view === 'otp' && (
                            <OTPverification email={userEmail} onSuccess={handleOTPSuccess} setIsLoading={setIsLoading}/>
                        )}

                        {view === 'success' && (
                            <div className="text-center animate-fade">
                                <h3 className="text-success mb-4">{message}</h3>
                                <button className="btn btn-dark" onClick={() => setView('login')}>Let's Go</button>
                            </div>
                        )}

                        {showModal && (
                            <>
                                <div className="position-fixed top-0 start-0 w-100 h-100" style={{ background: 'rgba(0, 0, 0, 0.4)', zIndex: 1050 }}></div>
                                <div className="modal d-block" tabIndex="-1" style={{ zIndex: 1055, position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '300px' }}>
                                        <div className="modal-content text-center" style={{ borderRadius: '8px', background: '#ffffff', border: 'none', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', padding: '24px' }}>
                                            <div style={{ width: '48px', height: '48px', backgroundColor: '#fef2f2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                                                <span style={{ fontSize: '20px' }}>⚠️</span>
                                            </div>
                                            <h6 style={{ color: '#374151', marginBottom: '8px', fontSize: '16px' }}>Error</h6>
                                            <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '20px' }}>{errorModalMsg}</p>
                                            <button type="button" className="btn btn-primary btn-sm" style={{ borderRadius: '6px', padding: '6px 16px', fontSize: '13px' }} onClick={() => setShowModal(false)}>OK</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );


}
