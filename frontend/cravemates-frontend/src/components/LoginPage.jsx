import React, { useState } from "react";
import '../css/loginpage.css'; 

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send login credentials to backend 
        const response = await fetch('http://localhost:8000/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        if (response.ok) {
            
            const data = await response.json();
            console.log(data);
            
            window.location.href = '/feed'; 
        } else {
            // Handle error
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="login-page">
            <h1 className="app-name">Crave-Mates</h1> 
            <div className="login-container">
                <h2 className="login-title">Login</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <div>
                        <label>Username</label>
                        <input
                            id="usernameBox"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit">Login</button>
                </form>
                <p className="signup-link">
                    Don&apos;t have an account? <a href="/signup">Signup</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
