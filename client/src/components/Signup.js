import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;

        // Make a POST request to your login API endpoint
        const response = await fetch("http://127.0.0.1:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const json = await response.json();
        console.log(json);

        if (json.success) {
            // Store the auth token in local storage
            localStorage.setItem('token', json.authtoken);
            // Redirect the user to the root URL upon successful logi
            navigate('/');
            props.showAlert("Your account is created Successfuly...", "success")
        } else {
            props.showAlert("Invalid credentials...", "danger")
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className='signup-container'>
            <h3 className='signup-title mb-3'>Signup to continue iNoteBook</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name" className="signup-label mb-1 mt-2">Full Name</label>
                    <input
                        type="text"
                        className="form-control signup-input"
                        id="name"
                        name='name'
                        onChange={onChange}
                        aria-describedby="nameHelp"
                        required
                        minLength={3}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="signup-label mb-1 mt-2">Email address</label>
                    <input
                        type="email"
                        className="form-control signup-input"
                        id="email"
                        name='email'
                        onChange={onChange}
                        aria-describedby="emailHelp"
                        required
                    />
                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="signup-label mb-1 mt-2">Password</label>
                    <input
                        type="password"
                        className="form-control signup-input"
                        id="password"
                        onChange={onChange}
                        name='password'
                        required
                        minLength={5}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword" className="signup-label mb-1 mt-2">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control signup-input"
                        id="cpassword"
                        onChange={onChange}
                        name='cpassword'
                        required
                        minLength={5}
                    />
                </div>

                <button type="submit" className="btn btn-primary signup-button my-3">Submit</button>
            </form>
        </div>
    );
};

export default Signup;
