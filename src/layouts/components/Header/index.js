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
    const user = JSON.parse(localStorage.getItem('currentUser'))
    const { nickname } = useParams()
    // useEffect(() => {
    //     const getUseruser = async () => {
    //         try {
    //             const { user } = await getProfileUser()
    //             if (user) {
    //                 setuser({ ...user.user })
    //             }
    //             if (user.err === 0) {
    //                 localStorage.removeItem('token');
    //                 const user = { Username: null, email: null, admin: null, avatar: null }
    //                 localStorage.setItem('currentUser', JSON.stringify(user));
    //             }
    //         }
    //         catch {
    //             // setUserState(localStorage.removeItem('token'))
    //             localStorage.removeItem('token');
    //             const user = { Username: null, email: null, admin: null, avatar: null }
    //             localStorage.setItem('currentUser', JSON.stringify(user));

    //         }
    //     }
    //     getUseruser()
    // }, [])
    const context = useContext(StoreContext)
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')} >
                <div className={cx('logo')}>
                    <div className={cx('bar-menu')}>
                        <FontAwesomeIcon onClick={context.handleBarMenu} icon={faBars} />
                    </div>
                    <Link to="/admin/manage-foods">
                        <img src={HealthyMenuAdmin} alt="HealthyMenu Admin" />
                    </Link>
                    <div className={cx('return-home')} onClick={() => {
                        navigate({
                            pathname: '/admin/manage-foods'
                        })
                    }}> <>
                        <FontAwesomeIcon icon={faAngleLeft} />
                        <span>Quay lại</span> </> 
                    </div>

                </div>
             
                <div className={cx('action')}>
                    {localStorage.getItem('token') ? (
                        <>

                            {/* {!(nickname) ? <MyCourse /> : ''} */}
                            <Avatar>
                                <div onClick={context.handleAvater} className={cx('avatar-user')}>
                                    <div className={cx('avatar-children')}>
                                        {
                                            user?.avatar ? (<img src={process.env.REACT_APP_BACKEND_URL + '/'+ user?.avatar} alt={user?.Username} />) : (

                                                <img src='https://bootdey.com/img/Content/avatar/avatar7.png' alt={user?.Username} />
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