
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faBookOpenReader } from '@fortawesome/free-solid-svg-icons'
import { Link, NavLink } from 'react-router-dom'
import { useContext } from 'react'
import styles from './BarMenu.module.scss'
import ConfigRoutes from '../../../../config/routes'
import { menuItems, navLinkStyle } from "../../../DefaultLayout/Sidebar/menuItems"
import { StoreContext } from '../../../../store';
const cx = classNames.bind(styles)

function BarMenu() {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    // const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
    const context = useContext(StoreContext)
    return (
        context.barmenu && <div className={cx('model', context.barmenu ? ("") : ("closing"))}>
            <div className={cx('body')}>

                <div className={cx("overlay")} >
                    <FontAwesomeIcon onClick={context.handleBarMenu} className={cx('closebtn')} icon={faXmark} />
                    {user.Username ? (<div className={cx("user")}>
                        <div className={cx('avatar')}>
                            <div className={cx('avatar-child')}>
                                {/* <img src={user.avatar ? ('https://www.gravatar.com/avatar/fa88b4d7b23fa21224fca92bbf4b16c8?s=140&d=retro') : ('https://bootdey.com/img/Content/avatar/avatar7.png')} alt={user.Username} /> */}
                                {user?.provider ? <img src={user?.avatar} alt={user?.Username} /> :
                                    user?.avatar ? (<img src={process.env.REACT_APP_BACKEND_URL + '/user/' + user?.nickname + '/' + user?.avatar} alt={user?.Username} />) : (

                                        <img src='https://bootdey.com/img/Content/avatar/avatar7.png' alt={user?.Username} />
                                    )}
                            </div>
                        </div>
                        <div className={cx('info')}>
                            <span className={cx('name')}>{user.Username}</span>
                        </div>
                    </div>) : (<div className={cx("user-new")}>
                        <Link className={cx('bnt-login')} to={ConfigRoutes.Login}>Đăng nhập</Link>
                    </div>)}

                    <div className={cx('list-item')}>
                        {user.Username &&
                            <ul className={cx('details', 'detail-list')}>
                                <li className={cx('item-child')}>
                                    <NavLink style={navLinkStyle} to={'/@/' + user.nickname} className={cx('sidebar-item')} >
                                        <em>
                                            <FontAwesomeIcon icon={faBookOpenReader} />
                                        </em>
                                        <span>Trang cá nhân</span>
                                    </NavLink>
                                </li>
                                {/* <li className={cx('item-child')}>
                                    <NavLink style={navLinkStyle} to={ConfigRoutes.MyOnwCourse} className={cx('sidebar-item')} >
                                        <em>
                                            <FontAwesomeIcon icon={faBookOpenReader} />
                                        </em>
                                        <span>Khóa học của tôi</span>
                                    </NavLink>
                                </li> */}
                            </ul>}
                        <ul className={cx('details', 'detail-list')}>
                            {
                                menuItems.map((item, index) => (
                                    <li key={index} className={cx('item-child')}>
                                        <NavLink style={navLinkStyle} to={item.path} className={cx('sidebar-item')} >
                                            <em>
                                                {item.icon}
                                            </em>
                                            <span>{item.name}</span>
                                        </NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                        {user.Username &&
                            <ul className={cx('details', 'detail-list')}>

                                <li className={cx('item-child')}>
                                    <button className={cx('sidebar-item')} onClick={handleLogout}>
                                        <em>
                                            <FontAwesomeIcon icon={faBookOpenReader} />
                                        </em>
                                        <span>Đăng xuất</span>
                                    </button>
                                </li>
                            </ul>
                        }
                    </div>

                </div>
            </div>
        </div>


    )
}
export default BarMenu