import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from "classnames/bind";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { isEmpty } from 'validator'
import styles from './Setting.module.scss'
import { dataRouteProfiles, navLinkStyle } from './data';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import Button from '../../layouts/components/Button';
import { updateImage, updateUser } from '../../API/userRequest';

const cx = classNames.bind(styles)
function Setting() {

    const user = JSON.parse(localStorage.getItem('currentUser'))
    const [btnEditUserName, setBtnEditUserName] = useState(false)
    const [btnEditAvatar, setBtnEditAvatar] = useState(false)
    const [Username, setUsername] = useState(user?.username)
    const [avatar, setAvatar] = useState(user?.avatar)
    const [file, setFile] = useState(null)

    const handleSaveUserName = async () => {
        try {
            if (isEmpty(Username) || Username === user.Username) {
                setBtnEditUserName(false)
                return
            } else {
             
                const format = new FormData()
                format.append('username', Username);
                const res = await updateUser( format)
                if (res.status === 200)
                    toast("Thay đổi thành công", {
                        position: "top-center",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    })
                setBtnEditUserName(false)
                localStorage.setItem('currentUser', JSON.stringify(res.data.data))
            }
        } catch {
            toast.error("Lỗi server", {
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
    const handleSaveAvatar = async () => {
        if (file == null) {
            setBtnEditAvatar(false)
            return
        } else {
            try {
                const format = new FormData()
                format.append('image', file);
                const res = await updateUser( format)
                if (res.status === 200)
                    toast("Thay đổi thành công", {
                        position: "top-center",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    })
                setBtnEditAvatar(false)
                setFile(null)
                setAvatar(res.data.data.avatar)
                localStorage.setItem('currentUser', JSON.stringify(res.data.data))

            } catch {
                toast.error("Lỗi server", {
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
    useEffect(() => {
        return () => {
            file && URL.revokeObjectURL(file.preview)
        }
    }, [file])

    const handePreviewAvatar = (e) => {
        const input = e.target
        const selectedImage = input.files[0]
        selectedImage["typeUpload"] = "user"
        if (!selectedImage) {
            setFile(null)
            return
        }
        input.value = ""
        selectedImage.preview = URL.createObjectURL(selectedImage)
        setFile(selectedImage)
    }



    return (<><div className={cx('setting-wrapper')}>
        <div className={cx('setting-side-left')}>
            <h1 className={cx('setting-heading')}>Cài Đặt</h1>
            <ul className={cx('setting-list')}>
                {dataRouteProfiles.map((val, index) =>
                    <li key={index}>
                        <NavLink style={navLinkStyle} to={val.route}  >
                            <FontAwesomeIcon icon={val.icon} className={cx('setting-icon')} />
                            <span>{val.discp}</span>
                        </NavLink>
                    </li>)}
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
                                        <input type='text' className={cx("field-input-content")} value={Username} onChange={(e) => setUsername(e.target.value)} maxLength='50' disabled={!btnEditUserName} />
                                        <div className={cx("description")}>
                                            <p>Tên của bạn xuất hiện trên trang cá nhân và bên cạnh các bình luận của bạn.</p>
                                        </div>
                                    </div>
                                </div>
                                {btnEditUserName ? <div className={cx('field-bnt')}>
                                    <Button normal onClick={() => setBtnEditUserName(false)}>Hủy</Button>
                                    <Button primary onClick={handleSaveUserName}>Lưu</Button>
                                </div> :
                                    <div className={cx('field-bnt')}>
                                        <button className={cx('field-button')} onClick={() => setBtnEditUserName(true)}>Chỉnh sửa</button>
                                    </div>
                                }
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
                                                <div className={cx('avatar')} onClick={() => setBtnEditAvatar(true)}>
                                                    {file ? <img className={cx('image-avatar')} src={file.preview} alt={Username} /> :
                                                            avatar ? (<img className={cx('image-avatar')} src={process.env.REACT_APP_BACKEND_URL + '/' +avatar} alt={Username} />) : (

                                                                <img className={cx('image-avatar')} src='https://bootdey.com/img/Content/avatar/avatar7.png' alt={Username} />
                                                            )}
                                                </div>
                                            </div>

                                            <label htmlFor="avatar">
                                                {btnEditAvatar ? <>
                                                    <div className={cx('parentcamera')}>
                                                        <FontAwesomeIcon className={cx('camera')} icon={faCamera} />
                                                    </div>
                                                    <input id='avatar' type='file' accept='image/jpg, image/jpeg, image/png' style={{ display: "none" }} onChange={(e) => handePreviewAvatar(e)} /></> : ''}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                {btnEditAvatar ? <div className={cx('field-bnt')}>
                                    <Button normal onClick={() => {
                                        setBtnEditAvatar(false)
                                        setFile(null)
                                    }}>Hủy</Button>
                                    <Button primary onClick={handleSaveAvatar}>Lưu</Button>
                                </div> :
                                    <div className={cx('field-bnt')}>
                                        <button className={cx('field-button')} onClick={() => setBtnEditAvatar(true)}>Chỉnh sửa</button>
                                    </div>}

                            </div>
                            <div className={cx('field-wrapper')}>
                                <div className={cx('field-input')}>
                                    <h3 className={cx('field-label')}>Email</h3>
                                    <div className={cx('field-description')}>
                                        <input type='text' className={cx("field-input-content")} placeholder='thêm tên của bạn' value={user.email ? user.email : ''} maxLength='50' disabled />

                                    </div>
                                </div>
                            </div>
                            <div className={cx('field-wrapper')}>
                                <div className={cx('field-input')}>
                                    <h3 className={cx('field-label')}>Username</h3>
                                    <div className={cx('field-description')}>
                                        <input type='text' className={cx("field-input-content")} placeholder='thêm tên của bạn' value={user.username} maxLength='50' disabled />
                                        <div className={cx("description")}>

                                            <p><span className={cx('field-url')}>URL: </span>{process.env.REACT_APP_FRONTEND_URL}/@/{user.username}</p>
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

                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    </div>
        <ToastContainer /></>)
}
export default Setting