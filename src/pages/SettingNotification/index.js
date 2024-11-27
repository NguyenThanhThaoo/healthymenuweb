import { Link } from 'react-router-dom';
import styles from './Notification.module.scss'
import classNames from "classnames/bind";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faShield, faUser } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles)
function Setting() {
    return (<div className={cx('setting-wrapper')}>
        <div className={cx('setting-side-left')}>
            <h1 className={cx('setting-heading')}>Cài Đặt</h1>
            <ul className={cx('setting-list')}>
                <li>
                    <Link className={cx('setting-active')}>
                        <FontAwesomeIcon icon={faUser} className={cx('setting-icon')} />
                        <span>Cài đặt tài khoản</span>
                    </Link>
                </li>
                <li>
                    <Link>
                        <FontAwesomeIcon icon={faShield} className={cx('setting-icon')} />
                        <span>Đăng nhập và bảo mật</span>
                    </Link>
                </li>
                <li>
                    <Link>
                        <FontAwesomeIcon icon={faBell} className={cx('setting-icon')} />
                        <span>Thông báo</span>
                    </Link>
                </li>
            </ul>
        </div>
        <div className={cx('setting-side-right')}>
            <section className='row'>
                <section className=' col col-sm-12 col-md-12 col-lg-12'>
                    <div className={cx('setting-content')}>
                        <div className={cx('groupfield-wrapper')}>
                            <h2 className={cx('field-heading')}>Thông tin cá nhân</h2>
                            <div className={cx('field-wrapper')}>
                                <div className={cx('field-input')}>
                                    <h3 className={cx('field-label')}>Họ và tên</h3>
                                    <div className={cx('field-description')}>
                                        <input type='text' className={cx("field-input-content")} value='Huỳnh Hữu Nghĩa' placeholder='thêm tên của bạn' maxLength='50' disabled />
                                        <div className={cx("description")}>
                                            <p>Tên của bạn xuất hiện trên trang cá nhân và bên cạnh các bình luận của bạn.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('field-bnt')}>
                                    <button className={cx('field-button')}>Chỉnh sửa</button>
                                </div>
                            </div>
                            <div className={cx('field-wrapper')}>
                                <div className={cx('field-input')}>
                                    <h3 className={cx('field-label')}>Avatar</h3>
                                    <div className={cx('photo-content')}>
                                        <div className={cx("description")}>
                                            <p>Nên là ảnh vuông, chấp nhận các tệp: JPG, PNG hoặc GIF.</p>
                                        </div>
                                        <div className={cx('field-photo')}>
                                            <div className={cx('image-photo')}>
                                                <div className={cx('avatar')}>
                                                    <img className={cx('image-avatar')} src='https://bootdey.com/img/Content/avatar/avatar7.png' alt='avatar' />
                                                </div>
                                            </div>
                                            <label for="avatar"></label>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('field-bnt')}>
                                    <button className={cx('field-button')}>Chỉnh sửa</button>
                                </div>
                            </div>
                            <div className={cx('field-wrapper')}>
                                <div className={cx('field-input')}>
                                    <h3 className={cx('field-label')}>Email</h3>
                                    <div className={cx('field-description')}>
                                        <input type='text' className={cx("field-input-content")} placeholder='thêm tên của bạn' value='minhnghiatbag8888@gmail.com' maxLength='50' disabled />

                                    </div>
                                </div>
                            </div>
                            <div className={cx('field-wrapper')}>
                                <div className={cx('field-input')}>
                                    <h3 className={cx('field-label')}>Username</h3>
                                    <div className={cx('field-description')}>
                                        <input type='text' className={cx("field-input-content")} placeholder='thêm tên của bạn' value='HuynhHuuNghia' maxLength='50' disabled />
                                        <div className={cx("description")}>

                                            <p><span className={cx('field-url')}>URL: </span>{process.env.REACT_APP_FRONTEND_URL}/@HuynhHuuNghia</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('field-wrapper')}>
                                <div className={cx('field-input')}>
                                    <h3 className={cx('field-label')}>Số điện thoại</h3>
                                    <div className={cx('field-description')}>
                                        <input type='text' className={cx("field-input-content")} value='' placeholder='Thêm số điện thoại' maxLength='50' disabled />
                                        <div className={cx("description")}>
                                            <p>Số điện thoại liên kết với LE</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('field-bnt')}>
                                    <button className={cx('field-button')}>Chỉnh sửa</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    </div>)
}
export default Setting