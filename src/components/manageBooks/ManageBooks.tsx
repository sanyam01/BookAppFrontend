import './ManageBooks.scss';
import { useSelector } from 'react-redux';
import BookUI from '../books/BookUI';
interface IProps {
    onEdit: Function;

}

const ManageBooks = (props: IProps) => {

    const token = useSelector((state: any) => state.token);
    const userID = useSelector((state: any) => state.userID);
    const books = useSelector((state: any) => state.books);
    const displayBooks = books.filter((book: any) => book.userID === userID);

    return (
        <div className="manageBooks">
            <div className="manageBooksTitle">
                Manage Books
            </div>
            <div className='booksDiv'>
                {displayBooks.map((book: any) => <BookUI book={book} token={token} key={book.id} showDelete={true} onEdit={() => props.onEdit(book)} />)}
            </div>
        </div>
    );

}

export default ManageBooks;