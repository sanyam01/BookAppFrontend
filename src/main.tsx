import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import LoginForm from './components/authentication/LoginForm';
import { useEffect, useState } from 'react';

const Main = () => {

    const [token, setToken] = useState("");

    useEffect(() => {
        const userData = localStorage.getItem("userData");
        if (userData) {
            const userDataParse = JSON.parse(userData);
            setToken(userDataParse.token);

        }
    });


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App setToken={(value: any) => setToken(value)} token={token} />} />
                <Route path="/login" element={<LoginForm setToken={(value: any) => setToken(value)} token={token} />} />
            </Routes>
        </BrowserRouter>

    );

}

export default Main;

