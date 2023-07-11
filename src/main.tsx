import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import LoginForm from './components/authentication/LoginForm';
import { useEffect } from 'react';
import { useAppDispatch } from './store/store'
import { bookSliceActions } from './store/bookSlice'

const Main = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        const userData = localStorage.getItem("userData");
        if (userData) {
            const userDataParse = JSON.parse(userData);
            dispatch(bookSliceActions.setToken(userDataParse.token));
            dispatch(bookSliceActions.setName(userDataParse.username));
            dispatch(bookSliceActions.setID(userDataParse.userID));
        }
    });


    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<LoginForm />} />
            </Routes>
        </BrowserRouter>


    );

}

export default Main;

