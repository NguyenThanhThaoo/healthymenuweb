import { Link } from 'react-router-dom';
import styles from './PageNoteFound.module.scss'
import classNames from "classnames/bind";
import { logo } from '../../assets/image';
import Configroutes from '../../config/routes'
const cx = classNames.bind(styles)

function PageNoteFound() {
    return (<>
        <div className={cx('Wrapper')}>
            <div className={cx('header')}>
                <Link to={Configroutes.manageCourses} className={cx('logo')}>
                    <img src={logo} alt="logo" />
                </Link>
                <p className={cx('logoheading')}>
                    <Link to={Configroutes.manageCourses}>Học Lập Trình</Link>
                </p>
            </div>
            <div className={cx('content')}>
                <h2 className={cx('erro-4xx')}></h2>
                <h1 className={cx('title')}>Không tìm thấy nội dung 😭</h1>
                <ul>
                    <li className={cx('suggest')}>URL của nội dung này đã bị thay đổi hoặc không còn tồn tại.</li>
                    <li className={cx('suggest')}>Nếu bạn đang lưu URL này, hãy thử truy cập lại từ trang chủ thay vì dùng URL đã lưu.</li>
                </ul>
                <p>
                    <Link to={Configroutes.manageCourses} className={cx('btn-return')}>Quay về trang chủ</Link>
                </p>
                {/* <p>
                    👉 Hoặc đi tới
                    <Link to={Configroutes.MyOnwCourse} className={cx('btn-return', 'onwcourse')}>Khóa học của tôi</Link>
                </p> */}
            </div>
            <div className={cx('copyright')}>©2023 - 2024 LE. Nền tảng học lập trình hàng đầu Việt Nam</div>
        </div>
    </>)
}
export default PageNoteFound