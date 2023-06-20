import { Book } from '../../models/models';
import BookUI from './BookUI';

interface IProps {
    books: Book[];
    onDelete: Function;
}

const Books = (props: IProps) => {
    return (
        <div className='books'>
            {props.books.map((book) => <BookUI book={book} onDelete={props.onDelete} />)}
        </div>

    );
}

export default Books;