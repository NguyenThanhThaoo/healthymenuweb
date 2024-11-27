import classNames from "classnames/bind"
import styles from './Modal.module.scss'
import NewFeed from "../NewFeed/NewFeedBody/NewFeed"
import { useContext } from "react";
import { StoreContext } from '../../../store'
const cx = classNames.bind(styles)

function Modal() {
    const context = useContext(StoreContext)

    return (context.show && <div>
        <div className={cx('modal', 'fade-in', 'medium')}>
            <div onClick={context.handleShow} className={cx('close')}>&times;</div>
            <div className={cx('content')}>
                <header>
                    <h2 className={cx('heading')}>Bảng Tin LE</h2>
                </header>
                <NewFeed />
            </div>
        </div>
        <div className={cx('overlay', 'fade-in', 'close-when-click')} onClick={context.handleShow}></div>
    </div>)
}

export default Modal