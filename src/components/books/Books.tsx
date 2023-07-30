import { useSelector } from 'react-redux';
import { Book, Image } from '../../models/models';
import BookUI from './BookUI';
import { useEffect, useState } from 'react';

interface IProps {
    books: Book[];
    onAdd: Function;
    onEdit: Function;
    images: Array<Image>

}

const Books = (props: IProps) => {

    const [render, setRender] = useState(false);
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

    useEffect(() => {
        console.warn("props.images", props.images);
        setRender(!render);
    }, [props.images]);

    if (!displayBooks) {
        return null;
    }

    return (
        <div className='booksDiv'>
            {displayBooks?.map((book) => <BookUI book={book} token={token} key={book.id} onAdd={() => props.onAdd(book)} showDelete={false} onEdit={() => props.onEdit(book)} image={getImage(book)} />)}
        </div>

    );
}

export default Books;