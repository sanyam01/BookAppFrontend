import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './ListItemCanvas.scss';

interface IProps {
    text: string;
    icon: IconProp;
    onClick: Function;
}

const ListItemCanvas = (props: IProps) => {

    return (
        <div className="listItemCanvas" onClick={() => props.onClick()}>
            <FontAwesomeIcon icon={props.icon} className="itemIcon" />
            <div className="itemContent">
                {props.text}
            </div>

        </div>
    );
}

export default ListItemCanvas;