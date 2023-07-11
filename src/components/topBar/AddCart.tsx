import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import './AddCart.scss';
interface IProps {

}

const AddCart = (props: IProps) => {

    const cart = useSelector((state: any) => state.cart);
    console.warn("cart", cart);

    return (
        <div className="addCartDiv">
            <FontAwesomeIcon icon={faBook} className="addCartIcon" />
            <div className="cartItems">{cart ? cart.length : 0}</div>
        </div>
    );
}

export default AddCart;