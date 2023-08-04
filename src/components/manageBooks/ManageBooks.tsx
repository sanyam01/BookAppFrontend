import './ManageBooks.scss';
import { useSelector } from 'react-redux';
import BookUI from '../books/BookUI';
import { Book, Image } from '../../models/models';

interface IProps {
    onEdit: Function;
    images: Array<Image>
    categories: string[]
}

const ManageBooks = (props: IProps) => {

    const token = useSelector((state: any) => state.token);
    const userID = useSelector((state: any) => state.userID);
    const books = useSelector((state: any) => state.books);
    const displayBooks = books?.filter((book: any) => book.userID === userID);

    const getImage = (book: Book) => {
        let selectedImage = props.images.filter((image) => image.id === book.id);
        if (selectedImage.length > 0) {
            return selectedImage[0].image;
        }
        return "";

    }

    return (
        <div className="manageBooks" style={{ height: 'calc(100vh - 56px)', overflowY:'auto' }}>
            <div className="manageBooksTitle">
                Manage Books
            </div>
            <div className="allBooksManage">
                {displayBooks.map((book: Book) => <BookUI book={book} token={token} key={book.id} showDelete={true} onEdit={() => props.onEdit(book)} image={getImage(book)} />)}
            </div>
        </div >
    );

}

export default ManageBooks;