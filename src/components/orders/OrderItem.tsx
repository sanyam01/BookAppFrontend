import CartItem from '../topBar/CartItem';
import { Book } from '../../models/models';

interface IProps {
    book: Book;
    quantity: number;
}

const OrderItem = (props: IProps) => {

    return (
        <div>
            <CartItem book={props.book} quantity={props.quantity} />
        </div>
    );

}

export default OrderItem;