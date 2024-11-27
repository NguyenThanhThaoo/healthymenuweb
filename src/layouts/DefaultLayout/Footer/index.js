import classNames from "classnames/bind"
import styles from './Footer.module.scss'
import { Link } from 'react-router-dom'
import ConfigRoutes from '../../../config/routes'
import logo from '../../../assets/image/logo.png'


const cx = classNames.bind(styles)
function Footer() {
    return <div className={cx('wrapper')}>
        <section className={cx('module-grid', 'module-width')} style={{ maxWidth: '1100px' }}>
            <section className={cx('module-row')}>
                <section className={cx('module-col-2', 'module-c-12', 'module-m-12', 'module-l-3')}>
                    <div className={cx('column')}>
                        <div>
                            <div className={cx('column-top')}>
                                <Link to="/" >
                                    <img className={cx('logo')} src={logo} alt="F8" />
                                </Link>
                                <h2 className={cx('slogan')}>Học Lập Trình</h2>
                            </div>
                            <p className={cx('contact-list')}>
                                Điện thoại:
                                <Link to='tel:036.7122.096'> 036.7122.096</Link>
                                <br />
                                Email:
                                <Link to='mailto:nghiatbag8888@gmail.com'> nghiatbg8888@gmail.com</Link>
                                <br />
                                Địa chỉ: Thuận Giao, Thuận An, Bình Dương
                            </p>
                        </div>
                    </div>
                </section>
                {/* <section className={cx('module-col-2', 'module-c-12', 'module-m-12', 'module-l-3')}>
                    <div className={cx('column')}>
                        <div>
                            <h2 className={cx('heading')}>Tổng quan</h2>
                            <ul className={cx('list')}>
                                <li><Link to={ConfigRoutes.Introduce}>Giới thiệu</Link></li>
                                <li><Link to={ConfigRoutes.Contact}>Liên hệ</Link></li>
                                <li><Link to={ConfigRoutes.pathLearning}>Lộ trình</Link></li>

                            </ul>
                        </div>
                    </div>
                </section> */}
                <section className={cx('module-col-2', 'module-c-12', 'module-m-12', 'module-l-3')}>
                    <div className={cx('column')}>
                        <div>
                            <h2 className={cx('heading')}>Khóa học</h2>
                            <ul className={cx('list')}>
                                <li><Link to={ConfigRoutes.FrontEnd}>FrontEnd</Link></li>
                                <li><Link to={ConfigRoutes.BackEnd}>BackEnd</Link></li>
                                <li><Link to={ConfigRoutes.English}>English Course</Link></li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section className={cx('module-col-2', 'module-c-12', 'module-m-12', 'module-l-3')}>
                    <div className={cx('column')}>
                        <div>
                            <h2 className={cx('heading')}>Lĩnh vực</h2>
                            <ul className={cx('list')}>
                                <li>Lĩnh vực: Công nghệ, giáo dục, lập trình. LE xây dựng và phát triển những sản phẩm mang lại giá trị cho cộng đồng.</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </section>
            <section className={cx('module-row')}>
                <section className={cx('module-col-2', 'module-c-12', 'module-m-12', 'module-l-12')}>
                    <div className={cx('column')}>
                        <div className={cx('bottom')}>
                            <p className={cx('copyright')}>@ 2023 - 2024 LE. Nền tảng học mọi thứ</p>
                        </div>
                    </div>
                </section>
            </section>
        </section>
    </div>
}

export default Footer