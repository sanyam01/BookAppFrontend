import './TopBar.scss';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface IProps {
    setShowBook: Function;
    setSignUp: Function;
    token: string;
    logout: Function;
}

const TopBar = (props: IProps) => {

    return (

        <div className='topBar'>
            <div className='imgContent'>
                <img src='/images/book.jpg' alt="Books" />
                <div className="content">Calgary book store</div>
            </div>
            <div className="rightBar">
                {props.token !== "" && <Button onClick={() => props.setShowBook(true)}>
                    <FontAwesomeIcon icon={faPlus} />
                    Add Book
                </Button>}
                {props.token === "" && <Button onClick={() => props.setSignUp(true)}>
                    Sign Up
                </Button>}
                {props.token !== "" && <Button onClick={() => props.logout()}>
                    Log out
                </Button>}
            </div>

        </div>
    );
}

export default TopBar;