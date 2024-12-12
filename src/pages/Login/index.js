import { Link } from 'react-router-dom'
import classNames from "classnames/bind"
import { useState, useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { isEmpty, isEmail, isStrongPassword } from 'validator'
import Configroutes from '../../config/routes'
import styles from './Login.module.scss'
import { HealthyMenuAdmin } from '../../assets/image'
import { StoreContext } from '../../store'
import Button from '../../layouts/components/Button'
import { LoginMedthod } from '../../API/authRequest'

const cx = classNames.bind(styles)

function Login() {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [validateMsg, setValidateMsg] = useState({})
    const context = useContext(StoreContext)
    const msg = {}
    const ValidatAll = () => {
        if (isEmpty(email)) {
            msg.email = 'Vui lòng nhập email'
        }
        if (isEmpty(pass)) {
            msg.pass = 'Vui lòng nhập mật khẩu'
        } else if (!isStrongPassword(pass)) {
            msg.pass = 'Tối thiểu 8 chữ:ABcd123@'
        }

        setValidateMsg({ ...validateMsg, ...msg })
        if (Object.keys(msg).length > 0) { return false }
        return true
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
        validateMsg.email = ''
        setValidateMsg({ ...msg, ...validateMsg })
    }
    const onChangePass = (e) => {
        setPass(e.target.value)
        validateMsg.pass = ''
        setValidateMsg({ ...validateMsg })
    }
    const onBlurEmail = () => {

        if (isEmpty(email)) {
            validateMsg.email = 'Vui lòng nhập email'
        } else if (!isEmail(email)) {
            validateMsg.email = 'Email không đúng cú pháp'
        }

        setValidateMsg({ ...msg, ...validateMsg })
    }
    const onBlurPass = () => {
        if (isEmpty(pass)) {
            validateMsg.pass = 'Vui lòng nhập mật khẩu'
        } else if (!isStrongPassword(pass)) {
            validateMsg.pass = 'Tối thiểu 8 chữ:ABcd123@'
        }

        setValidateMsg({ ...validateMsg })
    }
    const hanldSubmit = async (e) => {
        const isValid = ValidatAll()
        if (!isValid) {
            e.preventDefault()
            return
        }
        else {
            try {
                e.preventDefault()
                const datas = {
                    email,
                    password:pass
                }
                const { data } = await LoginMedthod(datas)
                if (data.success === 1) {
                    setTimeout(() => {
                        context.setLoading(false)
                        window.location.href = '/admin/manage-foods'
                    }, 3000)
                    localStorage.setItem('token', data.acesstoken)
                    localStorage.setItem('currentUser', JSON.stringify(data.data))
                    context.setLoading(true)
                } else if (data.err === 1) {
                    
                    validateMsg.email = data.message
                    setValidateMsg({ ...validateMsg, ...msg })
                } else if (data.err === 0) {
                    validateMsg.pass = data.message
                    setValidateMsg({ ...validateMsg, ...msg })
                }
                else {
                    // alert()
                    toast.error(data.message, {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                }
            }
            catch {
                const data = { Username: null, email: null, admin: null, avatar: null }
                localStorage.setItem('currentUser', JSON.stringify(data))
                toast.error('Lỗi sever', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            }

        }
    }

    return (<>
        <div className={cx('wrapper', 'hasBg')} >
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('header')}>
                        {/* <Link to={Configroutes.}> */}
                            <img className={cx('logo')} src={HealthyMenuAdmin} alt='logo' />
                        {/* </Link> */}
                        <h1 className={cx('title')}>Đăng Nhập HealthyMenuAdmin
                        </h1>
                    </div>
                    <div className={cx('body')}>
                        <form><div className={cx('formBody')}>
                            <div className={cx('form-content')}>
                                <div className={cx('input-content')}>
                                    <div className={cx('labelGroup')}>
                                        <label className={cx('label')}>Email</label>
                                    </div>
                                    <div className={cx('inputGroup')}>
                                        <input
                                            placeholder='Nhập email'
                                            name='email'
                                            type='email'
                                            autoComplete='email'
                                            onBlur={onBlurEmail}
                                            onChange={onChangeEmail}
                                        />
                                    </div>
                                    <span className={cx('message')}>{validateMsg.email}</span>

                                </div>

                            </div>
                            <div className={cx('form-content')}>
                                <div className={cx('input-content')}>
                                    <div className={cx('labelGroup')}>
                                        <label className={cx('label')}>Mật khẩu</label>
                                    </div>
                                    <div className={cx('inputGroup')}>
                                        <input
                                            placeholder='Nhập mật khẩu'
                                            name='password'
                                            type='password'
                                            autoComplete='current-password'
                                            onBlur={onBlurPass}
                                            onChange={onChangePass}
                                        />
                                    </div>
                                    <span className={cx('message')} >{validateMsg.pass}</span>

                                </div>

                            </div>
                            <Button primary onClick={hanldSubmit} className={cx('sumbnt')}>
                                <div className={cx('inner', 'module-inner')}><span className={cx('module-text')}>Đăng nhập</span></div>
                            </Button>
                            {/* <p className={cx('noAccount')}>
                                Bạn chưa có tài khoản?
                                <Link to={Configroutes.Register}>Đăng ký</Link>
                            </p> */}


                        </div></form>
                    </div>
                </div>

            </div>
        </div>
        <ToastContainer />
    </>

    )
}
export default Login