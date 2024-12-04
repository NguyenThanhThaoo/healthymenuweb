import classNames from "classnames/bind"
import styles from './ShowMessageWatch.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { StoreContext } from '../../../store';
// import ConfigRoutes from '../../../../config/routes'
// import { Link } from "react-router-dom";
// import { Button } from "bootstrap";
const cx = classNames.bind(styles)


function ShowMessageWatch() {
    const navigate = useNavigate()
    const context = useContext(StoreContext)
    return (context.messageWatch && <div>
        <div className={cx('modal', 'medium')}>
            {/* <div className={cx('content')}> */}
            <div className={cx('toast', 'toast--error')}>
                <div className={cx("toast__icon")}>
                    <FontAwesomeIcon icon={faExclamationCircle} />
                </div>
                <div className={cx("toast__body")}>
                    <h3 className={cx("toast__title")}>Tải khóa học thất bại</h3>
                    <p className={cx("toast__msg")}>Bạn phải đăng nhập mới xem được khóa học</p>
                </div>
                <div onClick={() => context.setMessageWatch(false)} className={cx("toast__close")}>
                    <button onClick={() => {
                        context.setMessageWatch(false)
                        navigate({
                            pathname: '/Login'
                        })
                    }} className={cx('btn-login')}>Đăng nhập</button>
                </div>
            </div>
            {/* </div> */}
        </div>
        <div className={cx('overlay')}></div>

    </div>)
}
export default ShowMessageWatch