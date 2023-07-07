
import { Form, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import { initSignup } from '../../models/models';
import { Button } from 'react-bootstrap';
import { useState, ChangeEvent } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

interface IProps {
    token: string;
    setToken: Function;
}

const LoginForm = (props: IProps) => {

    const navigate = useNavigate();

    const [user, setUser] = useState(initSignup());

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const onSubmit = () => {
        const logUser = { username: user.username, password: user.password };
        axios.post('http://localhost:4000/login', logUser).then((res) => {
            props.setToken(res.data.token);
            localStorage.setItem(
                'userData',
                JSON.stringify({
                  token: res.data.token,
                  expiration: 3600
                })
              );
            console.warn("success");
            navigate('/');
        }).catch(() => {
            console.warn("fail");
        });
    }
    return (
        <div className="loginForm">
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
                <Button onClick={() => onSubmit()} disabled={user.username === "" || user.password === ""}>Login</Button>
                <Button onClick={() => navigate(-1)}>Cancel</Button>

            </div>

        </div>
    );
}

export default LoginForm;