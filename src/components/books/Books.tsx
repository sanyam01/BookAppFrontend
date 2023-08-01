import { useSelector } from 'react-redux';
import { Book, Image } from '../../models/models';
import BookUI from './BookUI';
import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface IProps {
    books: Book[];
    onAdd: Function;
    onEdit: Function;
    images: Array<Image>;
    categories: string[]

}

const hasScrollbar = (element: HTMLDivElement | null) => {
    if (!element) return false;
    return element.scrollWidth > element.clientWidth;
};

const Books = (props: IProps) => {

    const token = useSelector((state: any) => state.token);
    const userID = useSelector((state: any) => state.userID);
    const displayBooks = props.books?.filter((book) => book.userID !== userID);

    const categoryBookRefs = useRef<Array<HTMLDivElement | null>>([]);

    const [isContainerHovered, setIsContainerHovered] = useState<Array<boolean>>([]);

    const handleMouseEnter = (index: number) => {
        setIsContainerHovered((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
        });
    };

    const handleMouseLeave = (index: number) => {
        setIsContainerHovered((prev) => {
            const newState = [...prev];
            newState[index] = false;
            return newState;
        });
    };

    // Function to handle scrolling to the left for a specific category book div
    const scrollLeft = (index: number) => {
        const categoryBookRef = categoryBookRefs.current[index];
        if (categoryBookRef) {
            categoryBookRef.scrollLeft -= 100; // Adjust the value as needed for smooth scrolling
        }
    };

    // Function to handle scrolling to the right for a specific category book div
    const scrollRight = (index: number) => {
        const categoryBookRef = categoryBookRefs.current[index];
        if (categoryBookRef) {
            categoryBookRef.scrollLeft += 100; // Adjust the value as needed for smooth scrolling
        }
    };

    const getImage = (book: Book) => {
        let selectedImage = props.images.filter((image) => image.id === book.id);
        if (selectedImage.length > 0) {
            return selectedImage[0].image;

        }
        return "";

    }

    useEffect(() => {
        setIsContainerHovered(props.categories.map(() => false));
    }, [props.categories]);

    if (!displayBooks) {
        return null;
    }

    return (

        <div className="allBooks" style={{ height: 'calc(100vh - 56px)', overflowY: 'auto', position: 'relative' }}>
            {props.categories.map((category, index) => {
                const categoryBookRef = categoryBookRefs.current[index];
                const hasScroll = hasScrollbar(categoryBookRef);
                if (displayBooks.filter((book) => book.categoryID === category).length > 0) {
                    return <div className="categoryBookDiv" key={category}>
                        <div className="categoryTitle">
                            {category}
                        </div>
                        <div className="categoryBook" ref={(element) => (categoryBookRefs.current[index] = element)}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={() => handleMouseLeave(index)}>
                            {displayBooks.filter((book) => book.categoryID === category)?.map((book) => <BookUI book={book} token={token} key={book.id} onAdd={() => props.onAdd(book)} showDelete={false} onEdit={() => props.onEdit(book)} image={getImage(book)} />)}

                        </div>
                        <div className={`arrow arrow-left ${isContainerHovered[index] && hasScroll ? 'visible' : ''}`} onClick={() => scrollLeft(index)}>
                            <FontAwesomeIcon icon={faChevronLeft} className="arrowsIcon" />

                        </div>

                        <div className={`arrow arrow-right ${isContainerHovered[index] && hasScroll ? 'visible' : ''}`} onClick={() => scrollRight(index)}>
                            <FontAwesomeIcon icon={faChevronRight} className="arrowsIcon" />
                        </div>

                    </div>
                }

            }
            )}
        </div>

    );
}

export default Books;