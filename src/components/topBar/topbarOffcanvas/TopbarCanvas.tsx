import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Offcanvas } from 'react-bootstrap';
import { useState } from 'react';
import TopbarOffcanvasBody from './TopbarOffcanvasBody';
import './TopbarCanvas.scss';

interface IProps {
    setShowBook: Function;
}

const TopbarCanvas = (props: IProps) => {

    const [show, setShow] = useState(false);

    return (
        <>
            <div className="barsIcon" onClick={() => setShow(!show)}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            <Offcanvas placement='start' show={show} onHide={() => setShow(!show)} className="barcanvas1">
                <TopbarOffcanvasBody setShowBook={props.setShowBook} closeCanvas={() => setShow(false)} />
            </Offcanvas>

        </>

    );

}

export default TopbarCanvas;