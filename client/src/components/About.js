import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import './About.css'; // Import the CSS file


const About = () => {
    const context = useContext(noteContext);
    const navigate = useNavigate();
    const { about, getuser } = context;

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/Login');
        }
        getuser(); // Access getuser from the context
        // eslint-disable-next-line
    }, []);

    // Check if 'about' exists and 'about.image' is defined
    if (about && about.image && about.image.startsWith("C:\\fakepath\\")) {
        // Remove "C:\fakepath\" and add "../../public/assets/"
        about.image = `${about.image.substring(12)}`;
    }

    return (
        <div className="about-container">
            <div className="left-container">
                <img src={`http://localhost:5000/assets/${about.image}`} alt="User Profile" className="profile-image" />
                <div className="profile-name">{about && about.name ? about.name : ''}</div>
                <div className="profile-email">{about && about.email ? about.email : ''}</div>
                <div className="profile-email">Age : {about && about.email ? about.age : ''}</div>
                <div className="profile-email">Location : {about && about.email ? about.location : ''}</div>
            </div>
            <div className="right-container">
                <h1>About Me</h1>
                <p>{about.bio}</p>
            </div>
        </div>
    );
};

export default About;
