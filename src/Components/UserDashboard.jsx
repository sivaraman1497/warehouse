import React from 'react'
import { useNavigate, Link } from 'react-router-dom';

function UserDashboard(props) {
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
                <h1>Welcome, {props.username}</h1>
                <OrdersManagement/>
                <LogoutButton navigate={navigate}/>
            </>
        )
    }
}

function OrdersManagement()
{
    return (
        <>
            <Link className="btn btn-primary" to="/neworder">Create new order</Link>
        </>
    )
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

export default UserDashboard