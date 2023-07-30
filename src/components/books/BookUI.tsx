import './Book.scss';
import { Book } from '../../models/models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CommonTooltip from '../widgets/CommonTooltip';
import { faTrashCan, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/store';
import { bookSliceActions } from '../../store/bookSlice';
import './BookNew.scss';

interface IProps {
    book: Book;
    token: string;
    onAdd?: Function;
    showDelete: boolean;
    onEdit?: Function;
    image: string;
}

const BookUI = (props: IProps) => {

    const dispatch = useAppDispatch();

    const token = useSelector((state: any) => state.token);
    const data = useSelector((state: any) => state.books);

    // const divStyle = {
    //     backgroundImage: `url(${props.image})`,
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center',
    // };

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

        <div className="booksNew" >
            {/* <div style={divStyle} className="displayImage" /> */}
            {props.image && <img src={`data:image/jpeg;base64,${props.image}`} alt={`Image ${props.image}`} />}
            <div className="booksTopBar" >
                {props.showDelete && <div className="deleteButton" onClick={() => props.onEdit && props.onEdit()}>
                    <FontAwesomeIcon icon={faEdit} />
                </div>}
                {props.showDelete && <div className="deleteButton" onClick={() => onDelete(props.book)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </div>}

                {props.onAdd &&
                    <CommonTooltip title="Add to Cart">
                        <div className="deleteButton" onClick={() => props.onAdd ? props.onAdd(props.book) : () => { }}>
                            <FontAwesomeIcon icon={faPlus} onClick={() => props.onAdd ? props.onAdd(props.book) : () => { }} />
                        </div>
                    </CommonTooltip>}
            </div>
            <div className="textDiv">
                <div className='textContent'>{`Name : ${props.book.name}`}</div>
                <div className='textContent'>{`Description : ${props.book.description}`}</div>
                <div className='textContent'>{`Price : $${props.book.price}`}</div>
            </div>


        </div>


    );

}

export default BookUI;