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
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card login-container">
                        <div className="card-body">
                            <h3 className="card-title text-center">Login to continue iNoteBook</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={credentials.email}
                                        onChange={onChange}
                                        placeholder="Enter your email"
                                    />
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password1"
                                        value={credentials.password}
                                        name="password"
                                        onChange={onChange}
                                        placeholder="Enter your password"
                                    />
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Login;