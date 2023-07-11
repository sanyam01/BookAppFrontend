import './ManageBooks.scss';
import { useSelector } from 'react-redux';
import BookUI from '../books/BookUI';
interface IProps {

}

const ManageBooks = (props: IProps) => {

    const token = useSelector((state: any) => state.token);
    const userID = useSelector((state: any) => state.userID);
    const books = useSelector((state: any) => state.books);
    const displayBooks = books.filter((book: any) => book.userID === userID);
    console.warn("books", books);
    console.warn("displayBooks", displayBooks);
    console.warn("userID", userID);

    return (
        <div className="manageBooks">
            <div className="manageBooksTitle">
                Manage Books
            </div>
            <div className='books'>
                {displayBooks.map((book: any) => <BookUI book={book} token={token} key={book.id} showDelete={true} />)}
            </div>
        </div>
    );

}

export default ManageBooks;