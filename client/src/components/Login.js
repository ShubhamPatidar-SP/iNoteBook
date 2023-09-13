import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Make a POST request to your login API endpoint
        const response = await fetch("http://127.0.0.1:5000/api/auth/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });

        const json = await response.json();

        if (json.success) {
            // Store the auth token in local storage
            localStorage.setItem('token', json.authtoken);
            props.showAlert("You have loged in successfuly...", "success")
            // Redirect the user to the root URL upon successful login
            navigate('/');
        } else {
            props.showAlert("Invalid details...", "danger")
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className='login-container'>
            <h3 className='login-title my-3'>Login to continue iNoteBook</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email" className="login-label my-1">Email address</label>
                    <input
                        type="email"
                        className="form-control login-input"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={onChange}
                        placeholder="Enter your email"
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="login-label my-1">Password</label>
                    <input
                        type="password"
                        className="form-control login-input"
                        id="password1"
                        value={credentials.password}
                        name="password"
                        onChange={onChange}
                        placeholder="Enter your password"
                    />
                </div>
                <button type="submit" className="btn btn-primary login-button my-4">Submit</button>
            </form>
        </div>
    );
};

export default Login;