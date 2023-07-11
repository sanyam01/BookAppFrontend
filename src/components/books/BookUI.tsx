import './Book.scss';
import { Book } from '../../models/models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CommonTooltip from '../widgets/CommonTooltip';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/store';
import { bookSliceActions } from '../../store/bookSlice';


interface IProps {
    book: Book;
    token: string;
    onAdd?: Function;
    showDelete: boolean;
}

const BookUI = (props: IProps) => {

    const dispatch = useAppDispatch();

    const token = useSelector((state: any) => state.token);
    const data = useSelector((state: any) => state.books);
    const userID = useSelector((state: any) => state.userID);

    const onDelete = (book: Book) => {
        axios.post('http://localhost:4000/deleteBook', book, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const newData = data?.filter((book: any) => book.id !== response.data.id);
            dispatch(bookSliceActions.setBooks(newData));
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <div className="booksButton">
            <div className="book">
                <div>{props.book.name}</div>
                <div>{props.book.description}</div>
                <div>{props.book.price}</div>
            </div>
            {props.showDelete && <div className="deleteButton">
                <FontAwesomeIcon icon={faTrashCan} onClick={() => onDelete(props.book)} />
            </div>}
            {props.onAdd &&
                <CommonTooltip title="Add to Cart">
                    <div className="deleteButton" onClick={() => props.onAdd ? props.onAdd(props.book) : () => { }}>
                        <FontAwesomeIcon icon={faPlus} onClick={() => props.onAdd ? props.onAdd(props.book) : () => { }} />
                    </div>
                </CommonTooltip>}
        </div>

    );

}

export default BookUI;