
import { Form, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import { initSignup } from '../../models/models';
import { Button } from 'react-bootstrap';
import { useState, ChangeEvent } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { bookSliceActions } from '../../store/bookSlice';
import { useSelector } from "react-redux";

interface IProps {

}

const LoginForm = (props: IProps) => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const server = useSelector((state: any) => state.server);

    const [user, setUser] = useState(initSignup());

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const onSubmit = () => {
        const logUser = { username: user.username, password: user.password };
        axios.post(`${server}/login`, logUser).then((res) => {
            dispatch(bookSliceActions.setToken(res.data.token));
            localStorage.setItem(
                'userData',
                JSON.stringify({
                    token: res.data.token,
                    expiration: 3600,
                    username: logUser.username,
                    userID: res.data.userID
                })
            );
            dispatch(bookSliceActions.setName(logUser.username));
            dispatch(bookSliceActions.setID(res.data.userID));
            console.warn("success");
            navigate('/');
        }).catch(() => {
            console.warn("fail");
        });
    }
    return (
        <div className="loginForm customForm">
            <Form>
                <FormGroup>
                    <FormLabel>
                        Username
                    </FormLabel>
                    <FormControl
                        type="text"
                        value={user.username}
                        placeholder="Enter username"
                        onChange={(e) => onChange(e)}
                        name="username"
                        className="form-control-login"
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel>
                        Password
                    </FormLabel>
                    <FormControl
                        type="password"
                        value={user.password}
                        placeholder="Enter Password"
                        onChange={(e) => onChange(e)}
                        name="password"
                        className="form-control-login"

                    />
                </FormGroup>
            </Form>
            <div className="loginFormButtons">
                <Button onClick={() => onSubmit()} disabled={user.username === "" || user.password === ""} className="saveButton">Login</Button>
                <Button onClick={() => navigate(-1)} className="addButton">Cancel</Button>

            </div>

        </div>
    );
}

export default LoginForm;