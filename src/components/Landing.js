import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Landing = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [btnText, setBtnText] = useState('Sign In');
    const [btnColor, setBtnColor] = useState('btn-success'); // Bootstrap: green
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setBtnText('Logout');
            setBtnColor('btn-danger'); // Bootstrap: red
        } else {
            setBtnText('Sign In');
            setBtnColor('btn-primary');
        }
    }, []);

    const handleClick = () => {
        if (btnText === 'Logout') {
            localStorage.removeItem('token');
            window.location.href = '/';
        } else {
            window.location.href = '/login';
        }
    };




    return (
        <div
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #e0f7ff 0%, #ffffff 100%)',
                fontFamily: "'Segoe UI', sans-serif",
                overflow: 'hidden',
            }}
        >
            {/* Animation Styles */}
            <style>
                {`
          @keyframes flyIn {
            0% {
              transform: translateX(-300px) scale(0.8) rotate(-5deg);
              opacity: 0;
            }
            60% {
              transform: translateX(20px) scale(1.05) rotate(3deg);
              opacity: 1;
            }
            100% {
              transform: translateX(0) scale(1) rotate(0deg);
              opacity: 1;
            }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          .fly-in {
            animation: flyIn 2s ease-out forwards, float 4s ease-in-out infinite;
          }
        `}
            </style>

            {/* Navbar */}
            <nav
                className="navbar px-4 py-1 d-flex justify-content-between align-items-center"
                style={{
                    backdropFilter: 'blur(8px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                }}
            >
                <div
                    style={{
                        fontWeight: 'bold',
                        fontSize: '1.8rem',
                        color: '#1a1a1a',
                        letterSpacing: '1px',
                    }}
                >
                    PostBird
                </div>
                
                <button onClick={handleClick}
                    className={`btn ${btnColor} btn-primary mt-4`}
                    style={{
                        border: 'none',
                        borderRadius: '40px',
                        padding: '10px 24px',
                        fontSize: '0.95rem',
                        fontWeight: '600',
                        letterSpacing: '0.7px',


                        boxShadow: '0 6px 14px rgba(0, 132, 255, 0.3), inset 0 0 6px rgba(255,255,255,0.15)',
                        transition: 'all 0.3s ease',
                        textTransform: 'uppercase',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                    onMouseEnter={e => {
                        e.target.style.transform = 'scale(1.04)';
                        e.target.style.boxShadow = '0 8px 18px rgba(0, 132, 255, 0.5), inset 0 0 8px rgba(255,255,255,0.2)';
                    }}
                    onMouseLeave={e => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = '0 6px 14px rgba(0, 132, 255, 0.3), inset 0 0 6px rgba(255,255,255,0.15)';
                    }}
                >
                    <span style={{ position: 'relative', zIndex: 1 }}>{btnText}</span>
                </button>
            </nav>

            {/* Main Content */}
            <div className="container py-5">
                <div className="row align-items-center">
                    {/* Left Bird */}
                    <div className="col-md-6 text-center">
                        <img
                            src="/images/bird2.png"
                            alt="Bird illustration"
                            className="fly-in"
                            style={{
                                height: '360px',
                                maxWidth: '100%',
                                objectFit: 'contain',
                                marginTop: '20px',
                                filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.1))',
                            }}
                        />
                    </div>

                    {/* Right Description */}
                    <div className="col-md-6 mt-5 mt-md-0">
                        <h1
                            style={{
                                fontWeight: '800',
                                fontSize: '3rem',
                                color: '#111',
                                lineHeight: '1.3',
                            }}
                        >
                            Welcome to <span style={{ color: '#007bff' }}>PostBird</span>
                        </h1>
                        <p
                            style={{
                                fontSize: '1.2rem',
                                color: '#444',
                                marginTop: '20px',
                                letterSpacing: '0.5px',
                            }}
                        >
                            Your messages deserve wings. 🚀<br />
                            PostBird lets you send emails directly from your frontend — no server, no stress.<br />
                            Perfect for portfolios, static websites, college projects, contact forms, and more.
                        </p>
                        <button
                            className="btn btn-primary mt-4"
                            style={{
                                padding: '14px 34px',
                                borderRadius: '32px',
                                fontWeight: '600',
                                fontSize: '1.1rem',
                                boxShadow: '0 4px 18px rgba(13, 110, 253, 0.3)',
                                transition: 'transform 0.2s ease-in-out',
                            }}
                            onClick={() => setShowModal(true)}
                            onMouseEnter={e => (e.target.style.transform = 'scale(1.05)')}
                            onMouseLeave={e => (e.target.style.transform = 'scale(1)')}
                        >
                            Let’s Fly
                        </button>

                        {/* Modal */}
                        {showModal && (
                            <div
                                className="modal d-block fade show"
                                tabIndex="-1"
                                role="dialog"
                                style={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                }}
                            >
                                <div
                                    className="modal-dialog modal-dialog-centered"
                                    role="document"
                                >
                                    <div className="modal-content p-4 rounded-4 shadow-lg">
                                        <div className="modal-header border-0">
                                            <h5 className="modal-title" style={{ fontWeight: '700' }}>
                                                Quick Start Guide 📬
                                            </h5>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                onClick={() => setShowModal(false)}
                                            ></button>
                                        </div>
                                        <div className="modal-body">
                                            <p style={{ fontSize: '1rem', color: '#333' }}>
                                                Welcome to PostBird! ✨<br /><br />
                                                1️⃣ Integrate your frontend form.<br />
                                                2️⃣ Set your EmailJS template and key.<br />
                                                3️⃣ Hit send — your message flies.<br /><br />
                                                No backend. No fuss. Just  magic ✨.
                                            </p>
                                            <p>Click Sign in to start the service! 👆🤩</p>
                                        </div>
                                        <div className="modal-footer border-0">
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Got It!
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
