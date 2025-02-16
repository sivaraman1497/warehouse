import React, { useEffect, useState } from "react";
import LoginForm from "./Forms/LoginForm";
import SignupForm from "./Forms/SignupForm"
import AdminDashboard from "./Components/AdminDashboard";
import ItemsList from "./Components/ItemsList"
import CategoryCreationForm from "./Forms/CategoryCreationForm";
import ItemsCreationForm from "./Forms/ItemsCreationForm";
import UserDashboard from "./Components/UserDashboard";
import OrderCreationForm from "./Forms/OrderCreationForm";
// import Home from "./Components/Home";

import { UserProvider } from './Custom/UserContext';

import { Route, BrowserRouter, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

    const [isAdmin, setIsAdmin] = useState(false)
    const [username, setUsername] = useState('')

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
            .then((data) => {(data.firstname === 'admin') && setIsAdmin(true); setUsername(`${data.firstname} ${data.lastname}`)})
            .catch(err => {console.log(err)})
        }, [])

 /*    useEffect(() => {
        const fetchData = async () => {
            try
            {
                const res = await fetch('http://localhost:5000/loggedin')
                if(!res)
                {
                    throw new Error('No response')
                }

                const result = await res.json();
                console.log(result)
                result.admin && setIsAdmin(1)
            }
            catch(err)
            {
                console.log(err)
            }
        }

        fetchData()
    }, []) */

    
    return (
        <UserProvider>
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginForm/>} />
                        <Route path="/signup" element={<SignupForm/>} />
                        <Route path="/my" element={isAdmin ? <AdminDashboard username={username}/> : <UserDashboard username={username}/>} />
                        {/* <Route path="/itemsList1" element={<ItemsList/>}/> */}
                        <Route path="/itemsList" element={<ItemsCreationForm/>}/>
                        <Route path="/categoriesList" element={<CategoryCreationForm/>}/>
                        <Route path="/neworder" element={<OrderCreationForm/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </UserProvider>
    );
}

export default App;
