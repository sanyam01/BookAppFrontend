import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Book } from '../../models/models';
import './CartItem.scss';
import Form from 'react-bootstrap/Form';
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';

interface IProps {

    book: Book;
    quantity: number;
    onChange: Function;
    onRemove: Function;
}

const CartItem = (props: IProps) => {

    return (
        <div className="cartItem">
            <div className="cartNameAuthor">
                <div className="name">
                    {props.book.name}
                </div>
                <div className="author">
                    {props.book.author}
                </div>
            </div>
            <div className="formDiv">
                <Form.Control
                    type="number"
                    value={props.quantity}
                    onChange={(e) => props.onChange(e.target.value)}
                    min={1}

                />
            </div>
            <div className="cartEditPrice">


                {`$${Number(props.quantity) * Number(props.book.price)}`}


            </div>
            <div className="removeDiv">
                <div className="removeItem" onClick={() => props.onRemove()}>
                    <FontAwesomeIcon icon={faCircleMinus} />
                </div>
            </div>

        </div>
    );

}

export default CartItem;