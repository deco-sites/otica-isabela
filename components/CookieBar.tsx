import React, { useState, useEffect } from 'react';

const CookieBar: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');
        if (!cookiesAccepted) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookiesAccepted', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div style={{
            background: '#333',
            color: '#fff',
            padding: '15px',
            position: 'fixed',
            bottom: 0,
            width: '100%',
            textAlign: 'center',
            zIndex: 1000,
        }}>
            Este site utiliza cookies para garantir a melhor experiência. 
            <a href="/politica-de-privacidade" style={{ color: '#00f', textDecoration: 'underline' }}>
                Saiba mais
            </a>.
            <button 
                onClick={handleAccept} 
                style={{
                    background: '#00f',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    marginLeft: '15px',
                }}>
                Aceitar
            </button>
        </div>
    );
};

export default CookieBar;
