import classNames from "classnames/bind";
import { Link, useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { faArrowRight, faBars, faTrash, faPenFancy, faXmark, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StoreContext } from '../../store';
import { HealthyMenuAdmin } from '../../assets/image'
import styles from './ManageUsers.module.scss'
import ConfigRoutes from '../../config/routes'
import { deleteUser, editUser, getAllUsers, getDetailUser } from '../../API/adminRequest';
import Avatar from "../../layouts/components/proper/Avatar";
import { Stack, TablePagination } from "@mui/material";
const cx = classNames.bind(styles)

function ManageUsers() {
    const context = useContext(StoreContext)
    const [searchPar] = useSearchParams()
    const [users, setUsers] = useState([])
    const [active, setactive] = useState('')
    const [name, setName] = useState('')
    const [Country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [image, setImage] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [statusHealth, setStatusHealth] = useState('')
    const location = useLocation()
    const navigate = useNavigate();
    const dataUser = JSON.parse(localStorage.getItem('currentUser'))
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(12);
    const [totalPage, setTotalPage] = useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    useEffect(() => {
        const getDataUsers = async () => {
            try {
                const { data } = await getAllUsers({ page: page + 1, limit: rowsPerPage })
                if (data) {
                    console.log(data)
                    setUsers(data.users || [])
                    setTotalPage(data.totalPages || 0);
                } 
             
            }
            catch {
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
        getDataUsers()
        // eslint-disable-next-line
    }, [page,rowsPerPage])



    const handleSubmitEdit = async () => {
        try {
            const datas = {
                username: name,
                statusHealth: statusHealth,
                phoneNumber: phoneNumber,
                role: role,
                image: image,
                address: address,
                Country: Country,
                email: email
            }
            const res = await editUser(searchPar.get('id'), datas)
            if (res.status === 200) {
                toast.success("Sửa thành công", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                onHandleRefresh()
            }
        }
        catch {
            toast.error("Lỗi sever", {
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

    const onHandleRefresh = () => {
        setName('')
        setRole('')
        setAddress('')
        setImage('')
        setCountry('')
        setEmail('')
        setStatusHealth('')
        setPhoneNumber('')
        navigate({
            pathname: '/admin/manage-users',
        })
    }
    async function handleOnlickId(id) {
        try {
            const { data } = await getDetailUser(id)
            if (data) {
                setName(data.data.username);          // Đảm bảo 'username' là đúng key từ API
                setRole(data.data.role);              // Đảm bảo 'role' là đúng key từ API
                setAddress(data.data.address);        // Đảm bảo 'address' là đúng key từ API
                setImage(data.data.image);            // Sửa 'avatar' thành 'image' để phù hợp với API
                setCountry(data.data.Country);        // Đảm bảo 'Country' là đúng key từ API (case-sensitive)
                setEmail(data.data.email);            // Đảm bảo 'email' là đúng key từ API
                setStatusHealth(data.data.statusHealth); // Đảm bảo 'statusHealth' là đúng key từ API
                setPhoneNumber(data.data.phoneNumber);   // Đảm bảo 'phoneNumber' là đúng key từ API
                setactive("stepitem-active")
            }
        }
        catch {
            toast.error("Lỗi sever", {
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
    const handleDeleteCourse = async () => {

        try {
            const res = await deleteUser(searchPar.get('id'))
            if (res.status === 200) {
                toast.success("Xóa tài khoản thành công", {
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
            toast.error("Lỗi sever", {
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

    return <> <section className={cx('module-grid', 'module-fullwidth')} style={{ maxWidth: '1920px' }}>

        <div className={cx('header-wapper')}>
            <Link className={cx('header-logo')} to={ConfigRoutes.manageCourses}>
                <img alt='HealthyMenuAdmin' src={HealthyMenuAdmin} />
            </Link>
            <div className={cx('header-course-title')}>HealthyMenu role</div>
            <div className={cx('header-actions')}>
                <Avatar>
                    <button onClick={context.handleAvater} className={cx('action-bnt')}>
                        <img alt='logo' className={cx('header-icon')} src={dataUser.avatar ? process.env.REACT_APP_BACKEND_URL +  '/' + dataUser.avatar : "https://bootdey.com/img/Content/avatar/avatar7.png"} />
                        <span className={cx('header-label')}>{dataUser.Username}</span>
                    </button>
                </Avatar>
            </div>
        </div>
        {context.list && <> <div className={cx('track-wrapper')}>
            <div className={cx('container')}>
                <header className={cx('header')}>
                    <h1 className={cx('heading')}>Tài khoản Users</h1>
                    <button className={cx('track-close-btn')}>
                        <FontAwesomeIcon onClick={context.handleList} icon={faXmark} />
                    </button>
                </header>
                <div className={cx('body')}>
                <>
                    {users.map((user, index) =>
                    <div key={user.user_id} className={cx('trackitem-step-list', 'trackitem-open')}>
                        <div className={cx('stepitem-wrapper', searchPar.get('id') === user.user_id ? active : '')}>
                            <div onClick={() => {
                                handleOnlickId(user.user_id)
                                navigate({
                                    pathname: location.pathname,
                                    search: `?id=${user.user_id}`,
                                })
                            }
                            } className={cx('stepitem-info')}>
                                <h3 className={cx('stepitem-title')}>{index + 1}.{user.email}</h3>

                            </div>

                            {/* <div className={cx('stepitem-icon-box')}>
                                <FontAwesomeIcon className={cx('stepitem-state', 'stepitem-locked')} icon={faLock} />
                            </div> */}
                        </div>

                    </div>
                    )}
                    <Stack alignItems="center" mt="auto" display="flex" position={"sticky"} bottom={"0"} top={"0"} zIndex={"999"} backgroundColor={"white"} padding={"10px"}>
                                    <TablePagination
                                        component="div"
                                        count={totalPage * rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        rowsPerPage={rowsPerPage||10}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        labelRowsPerPage={"Trang"}
                                        sx={{
                                        
                                            '.MuiTablePagination-toolbar': {
                                                minHeight: 64,
                                            },
                                            '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                                                fontSize: '1.5rem',
                                            },
                                            '.MuiTablePagination-actions .MuiIconButton-root': {
                                                fontSize: '1.5rem',
                                            },
                                            '.MuiTablePagination-input': {
                                                fontSize: '1.5rem',
                                            },
                                        }}
                                    />
                                </Stack></>
                </div>
            </div>


        </div>
            <div className={cx('track-overlay')}></div></>}

        <div className={cx('content-wrapper', context.list ? ('') : ('content-full'))}>
            <div className={cx('video-content', context.list ? ('') : ('video_fullWidth'))}>
                <div className={cx('content-top')}>
                    <form className={cx('form')}>
                        <div className={cx('child-form')}>
                            <div className={cx('form-1')}>
                                <div className={cx('text-input')}>
                                    <label className={cx('label')}>Tên</label>
                                    <div className={cx('input-wrapper')}>
                                        <input
                                            type='text'
                                            value={name}
                                            placeholder='Nhập tên...'
                                            className={cx('inputs', 'inputss', 'fix-fontsize')}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className={cx('text-input')}>
                                    <label className={cx('label')}>Tình Trạng Bệnh</label>
                                    <div className={cx('input-wrapper')}>
                                        <input
                                            type='text'
                                            value={statusHealth || ''}
                                            placeholder='Nhập tình trạng bệnh...'
                                            className={cx('inputs', 'inputss', 'fix-fontsize')}
                                            onChange={(e) => setStatusHealth(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className={cx('text-input')}>
                                    <label className={cx('label')}>Email</label>
                                    <div className={cx('input-wrapper')}>
                                        <input
                                            type='text'
                                            value={email}
                                            placeholder='Nhập email...'
                                            className={cx('inputs', 'inputss', 'fix-fontsize')}
                                            // onBlur={onBlurPhone}
                                            onChange={(e) => setEmail(e.target.value)}
                                        // disabled={searchPar.get('id') ? false : true}

                                        />
                                    </div>
                                </div>
                                {/* <div className={cx('text-input')}>
                                    <label className={cx('label')}>Điện thoại</label>
                                    <div className={cx('input-wrapper')}>
                                        <input
                                            type='text'
                                            value={phoneNumber}
                                            placeholder='Nhập số điện thoại...'
                                            className={cx('inputs', 'inputss', 'fix-fontsize')}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </div>
                                </div> */}
                                {/* <div className={cx('text-input')}>
                                    <label className={cx('label')}>Địa chỉ</label>
                                    <div className={cx('input-wrapper')}>
                                        <select className={cx('inputs', 'inputss', 'fix-fontsize')} value={subject} onChange={(e) => setSubject(e.target.value)}>
                                            <option value="">-- Chọn loại khóa học --</option>
                                            <option value="English" >Tiếng anh</option>
                                            <option value="LT">Lập trình</option>
                                        </select>

                                        <input
                                            type='text'
                                            value={address}
                                            placeholder='Nhập địa chỉ...'
                                            className={cx('inputs', 'inputss', 'fix-fontsize')}
                                            // onBlur={onBlurEmail}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </div>

                                </div> */}
                            </div>
                            <div className={cx('form-2')}>
                                <div className={cx('text-input')}>
                                    <label className={cx('label')}>Quyền</label>
                                    <div className={cx('input-wrapper')}>
                                        <select className={cx('inputs', 'inputss', 'fix-fontsize')} value={role} onChange={(e) => setRole(e.target.value)}>
                                            <option value="">-- Chọn quyền --</option>
                                            <option value="admin" >role</option>
                                            <option value="user">User</option>
                                        </select>
                                    </div>
                                </div>
                                {/* <div className={cx('text-input')}>
                                    <label className={cx('label')}>Ảnh</label>
                                    <div className={cx('input-wrapper')}>
                                        <input
                                            type='text'
                                            value={image}
                                            placeholder='Nhập link ảnh...'
                                            className={cx('inputs', 'inputss', 'fix-fontsize')}
                                            // onBlur={onBlurPhone}
                                            onChange={(e) => setImage(e.target.value)}
                                        // disabled={searchPar.get('id') ? false : true}

                                        />
                                    </div>
                                </div> */}
                                
                                {/* <div className={cx('text-input')}>
                                    <label className={cx('label')}>Quốc gia</label>
                                    <div className={cx('input-wrapper')}>
                                        <input
                                            type='text'
                                            value={Country}
                                            placeholder='Nhập quốc gia...'
                                            className={cx('inputs', 'inputss', 'fix-fontsize')}
                                            // onBlur={onBlurPhone}
                                            onChange={(e) => setCountry(e.target.value)}
                                        // disabled={searchPar.get('id') ? false : true}

                                        />
                                    </div>
                                </div> */}

                            </div>
                        </div>

                    </form>

                </div>

            </div>
            <div className={cx('video-wrapper')}>
                <div className={cx('learning-center')}>
                    <div className={cx('videoplayer-wrapper')}>
                        <div className={cx('videoplayer-player')} style={{ width: '100%', height: '100%', }}>
                            <div style={{ width: '100%', height: '100%', backgroundSize: ' cover', backgroundPosition: 'center center', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: `url("${image ? process.env.REACT_APP_BACKEND_URL + '/user/' + name + '/' + image : "https://bootdey.com/img/Content/avatar/avatar7.png"}")` }}>

                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </div>
        <div className={cx('actionBar-wrapper')}>
            <button onClick={onHandleRefresh} className={cx('actionBar-bnt', 'actionBar-refres')}>
                <FontAwesomeIcon icon={faRefresh} />
                <span>Refresh</span>
            </button>
            <button onClick={handleDeleteCourse} className={cx('actionBar-bnt', 'actionBar-primary')}>
                <FontAwesomeIcon icon={faTrash} />
                <span>Xóa</span>
            </button>
            {/* <button onClick={handleSubmitEdit} className={cx('actionBar-bnt', 'actionBar-edit')}>
                <span>Sửa</span>
                <FontAwesomeIcon icon={faPenFancy} />
            </button> */}
            <div className={cx('toggle-wrapper')}>
                <button className={cx('toggle-btn')}>
                    {context.list ? (<FontAwesomeIcon onClick={context.handleList} icon={faArrowRight} />) : (<FontAwesomeIcon onClick={context.handleList} icon={faBars} />)

                    }
                </button>
            </div>

        </div>

    </section>
        <ToastContainer />
    </>
}
export default ManageUsers
