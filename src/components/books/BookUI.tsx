import './Book.scss';
import { Book } from '../../models/models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

interface IProps {
    book: Book;
    onDelete: Function;
}

const BookUI = (props: IProps) => {

    return (
        <div className="booksButton">
            <div className="book">
                <div>{props.book.name}</div>
                <div>{props.book.description}</div>
                <div>{props.book.price}</div>
            </div>
            <div className="deleteButton">
                <FontAwesomeIcon icon={faTrashCan} onClick={() => props.onDelete(props.book)} />
            </div>
        </div>

    );

}

export default BookUI;