import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "", image: "", age: "", location: "", bio: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, image, age, location, bio } = credentials;

        // Make a POST request to your login API endpoint
        const response = await fetch("http://127.0.0.1:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, image, age, location, bio })
        });

        const json = await response.json();
        console.log(json);

        if (json.success) {
            // Store the auth token in local storage
            localStorage.setItem('token', json.authtoken);
            // Redirect the user to the root URL upon successful login
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
        <div className="container">
            <div className="row justify-content-center mt-1">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center">Signup to continue iNoteBook</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        onChange={onChange}
                                        required
                                        minLength="3"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        onChange={onChange}
                                        required
                                    />
                                    {/* You can uncomment the next line if you want to display additional information */}
                                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        onChange={onChange}
                                        required
                                        minLength="5"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="cpassword"
                                        name="cpassword"
                                        onChange={onChange}
                                        required
                                        minLength="5"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="image"
                                        name="image"
                                        onChange={onChange}
                                        accept="image/*"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="age" className="form-label">Age</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="age"
                                        name="age"
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="location" className="form-label">Location</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="location"
                                        name="location"
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="bio" className="form-label">Bio</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="bio"
                                        name="bio"
                                        onChange={onChange}
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

export default Signup;
