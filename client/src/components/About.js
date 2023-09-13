import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate(); // Call useNavigate as a function
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/Login');
        }
        // eslint-disable-next-line
    }, []);
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-4">
                    <div className="profile-picture">
                        <img
                            src={""} // Add your profile picture source here
                            alt="Profile"
                            className="img-fluid rounded-circle profile-img"
                        />
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="user-info">
                        <h2>About Me</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula nisl vel turpis hendrerit,
                            eu sodales ex scelerisque. Nullam ut elit in metus feugiat ultrices. Sed lacinia libero in metus
                            scelerisque, et bibendum justo venenatis.
                        </p>
                        <p>
                            Name: John Doe <br />
                            Age: 30 <br />
                            Location: New York, USA
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
