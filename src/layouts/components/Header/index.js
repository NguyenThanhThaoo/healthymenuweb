import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faBars } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import Button from '../Button'
import { MyCourse, Avatar } from '../proper'
import Search from '../search'
import {HealthyMenuAdmin} from '../../../assets/image'
import { StoreContext } from '../../../store';
import Configroutes from '../../../config/routes'
import { getProfileUser } from '../../../API/userRequest'

// import axios from 'axios'


const cx = classNames.bind(styles)
function Header() {
    const navigate = useNavigate()
    const [data, setData] = useState({})
    const { nickname } = useParams()
    useEffect(() => {
        const getUserData = async () => {
            try {
                const { data } = await getProfileUser()
                if (data) {
                    setData({ ...data.data })
                }
                if (data.err === 0) {
                    localStorage.removeItem('token');
                    const data = { Username: null, email: null, admin: null, avatar: null }
                    localStorage.setItem('currentUser', JSON.stringify(data));
                }
            }
            catch {
                // setUserState(localStorage.removeItem('token'))
                localStorage.removeItem('token');
                const data = { Username: null, email: null, admin: null, avatar: null }
                localStorage.setItem('currentUser', JSON.stringify(data));

            }
        }
        getUserData()
    }, [])
    const context = useContext(StoreContext)
    return (
        <div className={cx('wrapper', nickname ? ('nav-transparent') : (''))}>
            <div className={cx('inner')} >
                <div className={cx('logo')}>
                    <div className={cx('bar-menu')}>
                        <FontAwesomeIcon onClick={context.handleBarMenu} icon={faBars} />
                    </div>
                    <Link to="/admin/manage-foods">
                        <img src={HealthyMenuAdmin} alt="HealthyMenu Admin" />
                    </Link>
                    {!(nickname) ? <h3 className={cx('logoHeading')}>HealthyMenu Admin</h3> : ''}
                    <div className={cx('return-home')} onClick={() => {
                        navigate({
                            pathname: '/admin/manage-foods'
                        })
                    }}> {nickname ? <>
                        <FontAwesomeIcon icon={faAngleLeft} />
                        <span>Quay lại</span> </> : ''}
                    </div>

                </div>
                {!(nickname) ? <Search /> : ''}
                <div className={cx('action')}>
                    {localStorage.getItem('token') ? (
                        <>

                            {/* {!(nickname) ? <MyCourse /> : ''} */}
                            <Avatar>
                                <div onClick={context.handleAvater} className={cx('avatar-user')}>
                                    <div className={cx('avatar-children')}>
                                        {data?.provider ? <img src={process.env.REACT_APP_BACKEND_URL + '/user/' + data?.nickname + '/' + data?.avatar} alt={data?.Username} /> :
                                            data?.avatar ? (<img src={process.env.REACT_APP_BACKEND_URL + '/user/' + data?.nickname + '/' + data?.avatar} alt={data?.Username} />) : (

                                                <img src='https://bootdey.com/img/Content/avatar/avatar7.png' alt={data?.Username} />
                                            )}
                                    </div>
                                </div>

                            </Avatar>
                        </>
                    ) : (
                        <Button primary href={Configroutes.Login}>Đăng Nhập</Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header