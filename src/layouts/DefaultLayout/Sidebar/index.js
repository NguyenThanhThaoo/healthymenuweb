import classNames from "classnames/bind"
import styles from './Sidebar.module.scss'
import { menuItems, navLinkStyle } from "./menuItems"
import { NavLink } from 'react-router-dom'

const cx = classNames.bind(styles)

function Sidebar() {
    return <div className={cx('wrapper-sidebar')}>
        <div className={cx('wrapper')}>

            <nav>
                <ul className={cx('side-list')} >
                    {
                        menuItems.map((item, index) => (
                            <li key={index}>
                                <NavLink style={navLinkStyle} to={item.path} className={cx('sidebar-item')} >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            </nav>

        </div>
    </div>
}

export default Sidebar