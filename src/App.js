import React from "react";
import LoginForm from "./Forms/LoginForm";
import SignupForm from "./Forms/SignupForm"

import { Route, BrowserRouter, Routes } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<SignupForm/>} />
                    <Route path="/signin" element={<LoginForm/>} />
                </Routes>
            </BrowserRouter>
        </div >
    );
}

export default App;
