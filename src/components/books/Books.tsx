import { useSelector } from 'react-redux';
import { Book } from '../../models/models';
import BookUI from './BookUI';

interface IProps {
    books: Book[];
    onAdd: Function;
    onEdit: Function;

}

const Books = (props: IProps) => {

    const token = useSelector((state: any) => state.token);
    const userID = useSelector((state: any) => state.userID);
    const displayBooks = props.books?.filter((book) => book.userID !== userID);

    if (!displayBooks) {
        return null;
    }
    return (
        <div className='booksDiv'>
            {displayBooks?.map((book) => <BookUI book={book} token={token} key={book.id} onAdd={() => props.onAdd(book)} showDelete={false} onEdit={()=> props.onEdit(book)}/>)}
        </div>

    );
}

export default Books;