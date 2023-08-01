import { useSelector } from 'react-redux';
import { Book, Image } from '../../models/models';
import BookUI from './BookUI';
import { useRef } from 'react';

interface IProps {
    books: Book[];
    onAdd: Function;
    onEdit: Function;
    images: Array<Image>;
    categories: string[]

}

const Books = (props: IProps) => {

    const token = useSelector((state: any) => state.token);
    const userID = useSelector((state: any) => state.userID);
    const displayBooks = props.books?.filter((book) => book.userID !== userID);

    const getImage = (book: Book) => {
        let selectedImage = props.images.filter((image) => image.id === book.id);
        if (selectedImage.length > 0) {
            return selectedImage[0].image;

        }
        return "";

    }

    if (!displayBooks) {
        return null;
    }


    return (

        <div className="allBooks" style={{ height: 'calc(100vh - 56px)', overflowY: 'auto' }}>
            {props.categories.map((category) => {
                if (displayBooks.filter((book) => book.categoryID === category).length > 0) {
                    return <div className="categoryBookDiv" key={category}>
                        <div className="categoryTitle">
                            {category}
                        </div>
                        <div className="categoryBook">
                            {displayBooks.filter((book) => book.categoryID === category)?.map((book) => <BookUI book={book} token={token} key={book.id} onAdd={() => props.onAdd(book)} showDelete={false} onEdit={() => props.onEdit(book)} image={getImage(book)} />)}
                        </div>
                    </div>
                }

            }
            )}

        </div>

    );
}

export default Books;