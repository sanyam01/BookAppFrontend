import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { faListCheck, faPlusCircle, faUser, faHouse, faBagShopping } from '@fortawesome/free-solid-svg-icons';
import ListItemCanvas from './ListItemCanvas';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '../../../store/store';
import { bookSliceActions } from '../../../store/bookSlice';
import axios from 'axios';

interface IProps {
    setShowBook: Function;
    closeCanvas: Function;
}

const TopbarOffcanvasBody = (props: IProps) => {

    const dispatch = useAppDispatch();

    const name = useSelector((state: any) => state.name);
    const token = useSelector((state: any) => state.token);
    const userID = useSelector((state: any) => state.userID);

    const logout = () => {
        localStorage.removeItem("userData");
        dispatch(bookSliceActions.resetStore());
        props.closeCanvas();

    }

    return (
        <div className="topBarCanvasBody">
            <div className="canvasBodyHeader">
                <div className="userName">Welcome {name}</div>
                <div >
                    <FontAwesomeIcon icon={faUser} className="iconUserDiv" />
                </div>
            </div>
            <ListItemCanvas text="Home" icon={faHouse} onClick={() => {
                dispatch(bookSliceActions.setPage("Books"));
                props.closeCanvas();
            }} />

            <div className="dividerDiv" />

            <div>
                <ListItemCanvas text="Add book" icon={faPlusCircle} onClick={() => {
                    props.setShowBook(true);
                    props.closeCanvas();
                }} />
                <ListItemCanvas text="Manage my books" icon={faListCheck} onClick={() => {
                    dispatch(bookSliceActions.setPage("Manage"));
                    props.closeCanvas();
                }} />

                <ListItemCanvas text="My Orders" icon={faBagShopping} onClick={() => {
                    axios.get('http://localhost:4000/orders', {
                        params: { userID },
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then((res) => {
                        console.warn("res.data", res.data);
                        dispatch(bookSliceActions.setOrder(res.data));
                        dispatch(bookSliceActions.setPage("Orders"));
                        props.closeCanvas();
                    }).catch((err) => {
                        console.warn("err", err);
                        console.warn("could not fetch orders");
                    });
                }} />
            </div>
            <div className="dividerDiv" />
            <div>

                <ListItemCanvas text="Logout" icon={faSignOut} onClick={logout} />

            </div>

        </div>
    );

}

export default TopbarOffcanvasBody;