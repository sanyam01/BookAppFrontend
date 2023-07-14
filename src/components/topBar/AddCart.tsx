import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import './AddCart.scss';
interface IProps {

}

const AddCart = (props: IProps) => {

    const cart = useSelector((state: any) => state.cart);
    let totalBooks = 0;
    if (cart !== null)
        for (const item of cart.books) {
            totalBooks += item.quantity;
        }

    return (
        <div className="addCartDiv">
            <FontAwesomeIcon icon={faBook} className="addCartIcon" />
            <div className="cartItems">{totalBooks}</div>
        </div>
    );
}

export default AddCart;