import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Book } from '../../models/models';
import './CartItem.scss';
import Form from 'react-bootstrap/Form';
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';

interface IProps {

    book: Book;
    quantity: number;
    onChange?: Function;
    onRemove?: Function;
    noBorder?: boolean;
}

const CartItem = (props: IProps) => {

    return (
        <div className="cartItem" style={{ border: `${props.noBorder && 'none'}` }}>
            <div className="cartNameAuthor">
                <div className="name">
                    {props.book.name}
                </div>
                <div className="author">
                    {props.book.author}
                </div>
            </div>
            <div className="formDiv">
                {props.onChange && <Form.Control
                    type="number"
                    value={props.quantity}
                    onChange={(e) => props.onChange ? props.onChange(e.target.value) : null}
                    min={1}

                />}
                {!props.onChange && <div>{props.quantity}</div>}
            </div>
            <div className="cartEditPrice">


                {`$${Number(props.quantity) * Number(props.book.price)}`}


            </div>
            {props.onRemove && <div className="removeDiv">
                <div className="removeItem" onClick={() => props.onRemove ? props.onRemove() : null}>
                    <FontAwesomeIcon icon={faCircleMinus} />
                </div>
            </div>}

        </div>
    );

}

export default CartItem;