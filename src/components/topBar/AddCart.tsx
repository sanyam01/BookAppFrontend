import { faArrowRight, faBook, faMultiply, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import './AddCart.scss';
import { Offcanvas } from "react-bootstrap";
import { useState } from 'react';
import CartItem from './CartItem';
import { Book, Cart } from '../../models/models';
import { useAppDispatch } from '../../store/store';
import { bookSliceActions } from '../../store/bookSlice';
import axios from 'axios';
interface IProps {

}

const AddCart = (props: IProps) => {

    const [show, setShow] = useState(false);

    const onHide = () => {
        setShow(false);
    }

    const dispatch = useAppDispatch();

    const cart: Cart = useSelector((state: any) => state.cart);
    const token = useSelector((state: any) => state.token);
    let totalBooks = 0;
    let totalPrice = 0;
    if (cart !== null)
        for (const item of cart.books) {
            totalBooks += item.quantity;
            totalPrice += Number(item.quantity) * Number(item.book.price);
        }

    const onChange = (e: any, newBook: any) => {
        const newCart = {
            ...cart, books: cart.books.map((book: any) => {
                if (book.book.id === newBook.book.id)
                    return { ...book, quantity: Number(e) }
                else
                    return book
            })
        }

        dispatch(bookSliceActions.setCart(newCart));

    }

    const onRemove = (newBook: any) => {

        const newCart = {
            ...cart, books: cart.books.filter((book: any) => book.book.id !== newBook.book.id)
        }
        dispatch(bookSliceActions.setCart(newCart));

    }

    const order = () => {

        const newCart = { ...cart, date: new Date().toISOString() }

        axios.post('http://localhost:4000/addOrder', newCart, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            console.warn("response", response);
            dispatch(bookSliceActions.setCart(null));
        }).catch(error => {
            console.warn("error");
        })

    }

    return (
        <>
            <div className="addCartDiv" onClick={() => setShow(true)}>
                <FontAwesomeIcon icon={faBook} className="addCartIcon" />
                <div className="cartItems">{totalBooks}</div>
            </div>
            <Offcanvas show={show} onHide={() => onHide()} placement="end">
                <div className="cartForm">
                    <div className="cartFormHeader">
                        <div className="cartFormHead">
                            <div>
                                <FontAwesomeIcon icon={faShoppingCart} /></div>
                            <div>Quill Cart</div>
                        </div>
                        <div className="crossDiv" onClick={() => onHide()}>
                            <FontAwesomeIcon icon={faMultiply} className="cross" />
                        </div>
                    </div>
                    <div className="displayBooksPage">
                        <div className="yourBooks">
                            <div className="yourBooksName">
                                {`Your Books (${totalBooks})`}
                            </div>
                            <div>
                                {`$${totalPrice}`}
                            </div>
                        </div>
                        <div className="allItems">
                            {cart?.books.map((book: { book: Book, quantity: number }) => {
                                return (
                                    <CartItem book={book.book} quantity={book.quantity} onChange={(e: any) => onChange(e, book)} onRemove={() => onRemove(book)} />
                                );
                            })}

                        </div>
                    </div>
                    <div className="footerCart">
                        <div className="proceedButton" onClick={() => order()}>

                            Proceed to checkout

                            <FontAwesomeIcon icon={faArrowRight} />
                        </div>

                    </div>
                </div>

            </Offcanvas>
        </>
    );
}

export default AddCart;