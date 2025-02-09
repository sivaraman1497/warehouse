import React from "react";
import LoginForm from "./Forms/LoginForm";
import SignupForm from "./Forms/SignupForm"
import Dashboard from "./Components/Dashboard";
import ItemsList from "./Components/ItemsList"
import CategoryCreationForm from "./Forms/CategoryCreationForm";
import ItemsCreationForm from "./Forms/ItemsCreationForm";
// import Home from "./Components/Home";

import { UserProvider } from './Custom/UserContext';

import { Route, BrowserRouter, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <UserProvider>
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginForm/>} />
                        <Route path="/signup" element={<SignupForm/>} />
                        <Route path="/my" element={<Dashboard />} />
                        <Route path="/itemsList1" element={<ItemsList/>}/>
                        <Route path="/itemsList" element={<ItemsCreationForm/>}/>
                        <Route path="/categoriesList" element={<CategoryCreationForm/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </UserProvider>
    );
}

export default App;
