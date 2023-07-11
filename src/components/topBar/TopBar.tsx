import './TopBar.scss';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TopbarCanvas from './topbarOffcanvas/TopbarCanvas';
import { useSelector } from 'react-redux';
import AddCart from './AddCart';

interface IProps {
    setShowBook: Function;
    setSignUp: Function;
}

const TopBar = (props: IProps) => {

    const token = useSelector((state: any) => state.token);
    const page = useSelector((state: any) => state.page);

    return (

        <div className='topBar'>
            <div className="leftBar">
                {token !== "" && <TopbarCanvas setShowBook={props.setShowBook} />}
                <div className='imgContent'>
                    <img src='/images/book.jpg' alt="Books" />
                    <div className="content">QuillTome</div>
                </div>
            </div>
            <div className="rightBar">
                {token === "" && <Button onClick={() => props.setSignUp(true)}>
                    Sign Up
                </Button>}
                {token !== "" && page === "Books" && <AddCart />}
                {token !== "" && page === "Manage" && <Button onClick={() => props.setShowBook(true)}>
                    <FontAwesomeIcon icon={faPlus} />
                    Add Book
                </Button>}
            </div>
        </div>
    );
}

export default TopBar;