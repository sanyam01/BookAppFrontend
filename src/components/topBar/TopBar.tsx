import './TopBar.scss';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface IProps {
    setShowBook: Function;
}

const TopBar = (props:IProps) => {

    return (

        <div className='topBar'>
            <div className='imgContent'>
                <img src='/images/book.jpg' alt="Books" />
                <div className="content">BookSie</div>
            </div>
            <Button onClick={() => props.setShowBook(true)}>
                <FontAwesomeIcon icon={faPlus} />
                Add Book
            </Button>

        </div>
    );
}

export default TopBar;