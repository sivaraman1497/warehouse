import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, BrowserRouter } from 'react-router-dom';
import { useUser } from '../Custom/UserContext';    // custom hook

function HomePage() {
    const navigate = useNavigate();

    return (
        <div className='row container'>
            <div className='col-3'>
                <button className="btn btn-primary w-100" onClick={() => navigate('/itemsList')}>Items Management</button>    
            </div>

            <div className="col-3">
                <button className="btn btn-primary w-100" onClick={() => navigate('/categoriesList')}>Categories Management</button>
            </div>
        </div>
    );
}

function WelcomeHeader() {
    const { username } = useUser()
    return <h1>Welcome, {username}</h1>;
}

function Dashboard() {
    return (
        <>
            <WelcomeHeader />
            <HomePage/>
        </>
    );
}

export default Dashboard
