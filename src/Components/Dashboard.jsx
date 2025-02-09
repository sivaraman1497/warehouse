import React, {useEffect, useState} from 'react';
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

function WelcomeHeader({username}) {
    // const { username, setUsername } = useUser()
    return <h1>Welcome, {username}</h1>;
}

function LogoutButton()
{

    const navigate = useNavigate()

    function handleLogout()
    {
        const url = 'http://localhost:5000/logout'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        .then((res) => res.json())
        .then(data => data.loggedout && navigate('/'))
    }

    return (
        <div className='text-end'>
            <button className='btn btn-primary' onClick={() => handleLogout()}>Logout</button>
        </div>
    )
}

function Dashboard() {
    const [username, setUsername] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const url = 'http://localhost:5000/loggedin';

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
            },
            credentials: 'include',
        })
        .then(res => res.json())
        .then((data) => (!data.loggedIn) ? navigate('/') : setUsername(data.firstname))
    }, [])

    return (
        <>
            <WelcomeHeader username={username} />
            <HomePage/>
            <LogoutButton navigate={navigate}/>
        </>
    );
}

export default Dashboard
