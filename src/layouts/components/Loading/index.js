import classNames from "classnames/bind"
import styles from './Loading.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useContext } from "react";
import { StoreContext } from '../../../store'
const cx = classNames.bind(styles)

function Loading() {
    const context = useContext(StoreContext)
    return (context.loading && <div>
        <div className={cx('modal', 'fade-in', 'medium')}>
            <div className={cx('content')}>
                <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
            </div>
        </div>
        <div className={cx('overlay', 'fade-in')}></div>
    </div>)
}

export default Loading