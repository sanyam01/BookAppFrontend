import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { faListCheck, faPlusCircle, faUser, faHouse } from '@fortawesome/free-solid-svg-icons';
import ListItemCanvas from './ListItemCanvas';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '../../../store/store';
import { bookSliceActions } from '../../../store/bookSlice';

interface IProps {
    setShowBook: Function;
    closeCanvas: Function;
}

const TopbarOffcanvasBody = (props: IProps) => {

    const dispatch = useAppDispatch();

    const name = useSelector((state: any) => state.name);

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
                <ListItemCanvas text="Manage my books" icon={faListCheck} onClick={() => {
                    dispatch(bookSliceActions.setPage("Manage"));
                    props.closeCanvas();
                }} />
                <ListItemCanvas text="Add book" icon={faPlusCircle} onClick={() => {
                    props.setShowBook(true);
                    props.closeCanvas();
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