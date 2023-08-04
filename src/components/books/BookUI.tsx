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
import { Modal } from 'react-bootstrap';
import { useState } from 'react';

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

    const [show, setShow] = useState(false);

    const server = useSelector((state: any) => state.server);

    const token = useSelector((state: any) => state.token);
    const data = useSelector((state: any) => state.books);

    const onDelete = (book: Book) => {
        axios.post(`${server}/deleteBook`, book, {
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
        <>
            <Modal onHide={() => setShow(false)} show={show} className="slideIn">
                <div className='modalBook'>
                    <div className="bookNameAuthor">
                        <div className="textDiv">
                            <strong>{props.book.name}</strong>
                            <div>by {props.book.author}</div>
                        </div>
                        <img src={`data:image/jpeg;base64,${props.image}`} alt={`Image ${props.image}`} className='displayImageModal' />
                    </div>
                    <p>
                        {props.book.description}
                    </p>

                </div>
            </Modal>

            <div className="displayBooksOverall">
                <div className="booksNew" >

                    {props.image && <img src={`data:image/jpeg;base64,${props.image}`} alt={`Image ${props.image}`} className='displayImage' onClick={() => setShow(true)} />}
                    {props.onAdd &&
                        <CommonTooltip title={token !== "" ? "Add to Cart" : "Login to add to cart"}>
                            <div className={`addToCart ${token === "" && 'disableAddCart'}`} onClick={() => props.onAdd ? props.onAdd(props.book) : () => { }}>
                                <FontAwesomeIcon icon={faPlus} onClick={() => props.onAdd ? props.onAdd(props.book) : () => { }} />
                                <div>Add</div>
                            </div>
                        </CommonTooltip>}
                    <div className='textContentNew'>{`$${props.book.price}`}</div>
                    <div className='textContentName'>{`${props.book.name}`}</div>
                    <div className='textContentAuthor'>{`by ${props.book.author}`}</div>
                </div>
                <div className="booksBottomBar" >
                    {props.showDelete && <div className="editButton" onClick={() => props.onEdit && props.onEdit()}>
                        <FontAwesomeIcon icon={faEdit} />
                        <div>Edit</div>
                    </div>}
                    {props.showDelete && <div className="deleteButton" onClick={() => onDelete(props.book)}>
                        <FontAwesomeIcon icon={faTrashCan} />
                        Delete
                    </div>}


                </div>

            </div>
        </>



    );

}

export default BookUI;