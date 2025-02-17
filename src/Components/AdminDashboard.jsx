import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../Custom/UserContext';    // custom hook

function AdminDashboard(props) {
    const navigate = useNavigate()

    function BadRequest()
    {
        return (
            <center>
                <h1>Error - 404 </h1>
                <h1>Please login to continue</h1>
            </center>
        )
    }


    if(!props.username)
    {
        return (
            <BadRequest/>
        )
    }

    else
    {
        return (
            <>
                <WelcomeHeader username={props.username}/>
                <HomePage/>
                <LogoutButton navigate={navigate}/>
            </>
        );
    }
}

function WelcomeHeader(username) {
    // const { username, setUsername } = useUser()
    return <h1>Welcome, {username.username}</h1>;
}

function HomePage() {
    return (
        <div className='row container'>
            <div className='col-3'>
                <Link className="btn btn-primary w-100" to="/categoriesList">Categories Management</Link>
            </div>

            <div className="col-3">
                <Link className="btn btn-primary w-100" to="/itemsList">Items Management</Link>
            </div>
        </div>
    );
}

const LogoutButton = React.memo(() => {
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
});

// const MemoizedDashboard = React.memo(Dashboard)

export default AdminDashboard
