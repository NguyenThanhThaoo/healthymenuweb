import classNames from "classnames/bind";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { UploadImage } from '../../layouts/components/proper'
import styles from './profile.module.scss'
import { getProfilePersonal, updateImage } from '../../API/userRequest';

import Button from '../../layouts/components/Button';
import { HelloWorld } from '../../assets/image';
const cx = classNames.bind(styles)
function Profile() {
    const { nickname } = useParams()
    const [user, setUser] = useState({})
    const [file, setFile] = useState('')
    const [upImage, setUpImage] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        return () => {
            file && URL.revokeObjectURL(file.preview)
        }
    }, [file])
    useEffect(() => {
        const getOwnUser = async (nickname) => {
            try {

                const { data } = await getProfilePersonal(nickname)
                if (data)
                    setUser(data.data)
                if (data.err === 0) {
                    localStorage.removeItem('token');
                    const data = { Username: null, email: null, admin: null, avatar: null }
                    localStorage.setItem('currentUser', JSON.stringify(data));
                }
            }
            catch {
                navigate({
                    pathname: '/Login'
                })
            }

        }
        getOwnUser(nickname)

        // eslint-disable-next-line
    }, [nickname])

    const handleSaveProfileURL = async () => {
        try {
            const format = new FormData()
            format.append('image', file)
            format.append('profile_url', "")
            const { data } = await updateImage(nickname, format)
            if (data.success === 1) {
                toast.success("Thay đổi thành công", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                setFile(null)
                setUser(data.data)

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

    return <><div className={cx('profile-wrapper')}>
        <div className={cx('profile-content')}>
            <section className={cx('module-grid', 'module-fullwidth')} style={{ maxWidth: '1100px' }}>

                <div className={cx('profile-banner')} style={{ backgroundImage: `url(${file ? file.preview : user.profile_url ? process.env.REACT_APP_BACKEND_URL + '/user/' + user.nickname + '/' + user.profile_url : HelloWorld})`, position: 'relative' }}>
                    {file ?
                        <div className={cx('action-btn')}>
                            <Button primary onClick={
                                () => setFile(null)

                            }
                            >Hủy</Button>
                            <Button primary onClick={handleSaveProfileURL}>Lưu</Button>
                        </div> : ''}
                    <div className={cx('profile-user')}>
                        <div className={cx('profile-avatar-user')}>
                            <div className={cx('fallack-avatar')}>
                                {user.provider ? <img className={cx('image')} src={user.avatar} alt={user.Username} /> :
                                    user.avatar ? (<img className={cx('image')} src={process.env.REACT_APP_BACKEND_URL + '/user/' + user.nickname + '/' + user.avatar} alt={user.Username} />) : (
                                        <img className={cx('image')} src='https://bootdey.com/img/Content/avatar/avatar7.png' alt={user.Username} />

                                    )}

                            </div>
                        </div>
                        <div className={cx('profile-user-name')}>
                            <span>{user?.Username}</span>
                        </div>
                    </div>
                    <UploadImage upImage={upImage} setUpImage={setUpImage} setFile={setFile} file={file}>
                        <div onClick={() => setUpImage(true)} className={cx('profile-bnt-change-cover')}>
                            <FontAwesomeIcon className={cx('icon-fix', 'icon')} icon={faCamera} />
                            <span className={cx('edit-image')}>Chỉnh sửa ảnh bìa</span>
                        </div>
                    </UploadImage>

                </div>
                <div className={cx('profile-container')}>
                    <section className={cx('module-row')}>
                        <section className={cx('col', 'col-c-12', 'col-m-12', 'col-l-5')}>
                            <div className={cx('content-left')}>
                                <div className={cx('box-wrapper')}>
                                    <h4 className={cx('box-title')}>Giới thiệu</h4>
                                    <div><div className={cx('participation')}>
                                        <div className={cx('participation-icon')}>
                                            <FontAwesomeIcon icon={faUserGroup} />
                                        </div>
                                        <span>Thành viên của <span className={cx('hightlight')}>Học lập trình-LE</span> năm nay</span>
                                    </div></div>
                                </div>
                                <div className={cx('box-wrapper')}>
                                    <h4 className={cx('box-title')}>Hoạt động gần đây</h4>
                                    <div><div className={cx('participation')}>
                                        <span className={cx('fix-size')}>Chưa có hoạt động nào gần đây</span>
                                    </div></div>
                                </div>
                            </div>
                        </section>
                        <section className={cx('col', 'col-c-12', 'col-m-12', 'col-l-7')}>
                            <div className={cx('box-wrapper')}>
                                <h4 className={cx('box-title')}>Các khóa học đã tham gia</h4>
                                <div>
                                    {user?.topics?.length <= 0 ? <span>Chưa đăng ký khóa học nào</span> :
                                        user?.topics?.map((course, index) => <div key={index} className={cx('profile-inner')}>
                                            <Link className={cx('profile-thumb')} to={'/Learning/' + course.slug + ''}><img className={cx('thumb-img')} src={process.env.REACT_APP_BACKEND_URL + '/topic/' + course.image} alt='1' /></Link>
                                            <div className={cx('info')}>
                                                <h3 className={cx('info-title')}><Link to={'/Learning/' + course.slug + ''}>{course.name}</Link></h3>
                                                <p className={cx('info-desc')}>{course.description}</p>
                                            </div>
                                        </div>)
                                    }

                                </div>
                            </div>
                        </section>
                    </section>
                </div>
            </section>
        </div>
    </div>
        <ToastContainer /></>
}
export default Profile