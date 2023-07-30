
import { Form, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Button } from 'react-bootstrap';
import { SignupData } from '../../models/models';
import './authentication.scss';
import { useNavigate } from 'react-router-dom';

interface IProps {
    show: boolean;
    closeForm: Function;
    signupData: SignupData;
    onChange: Function;
    onSubmit: Function;
}

const SignupForm = (props: IProps) => {

    const navigate = useNavigate();

    return (
        <Offcanvas show={props.show} onHide={() => props.closeForm()} placement="end" className="customForm">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Signup Form</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form>
                    <FormGroup>
                        <FormLabel>
                            Username
                        </FormLabel>
                        <FormControl
                            type="text"
                            value={props.signupData.username}
                            placeholder="Enter username"
                            onChange={(e) => props.onChange(e)}
                            name="username"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>
                            Password
                        </FormLabel>
                        <FormControl
                            type="password"
                            value={props.signupData.password}
                            placeholder="Enter Password"
                            onChange={(e) => props.onChange(e)}
                            name="password"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>
                            Confirm Password
                        </FormLabel>
                        <FormControl
                            type="password"
                            value={props.signupData.confirmPassword}
                            placeholder="Confirm Password"
                            onChange={(e) => props.onChange(e)}
                            name="confirmPassword"
                            isInvalid={props.signupData.password !== props.signupData.confirmPassword && props.signupData.confirmPassword !== ""} />
                        <FormControl.Feedback type="invalid">

                            <div className="feedback-message">Passwords do not match.</div>

                        </FormControl.Feedback>
                    </FormGroup>
                </Form>
                <div className="reverseRowFlex">
                    <Button onClick={() => props.onSubmit()} disabled={props.signupData.password !== props.signupData.confirmPassword} className="saveButton">Signup</Button>
                </div>

                <div className="loginText" onClick={() => navigate('/login')}>
                    Already a member/Login
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default SignupForm;