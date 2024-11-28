import { useContext, useEffect, useRef, useState } from 'react';
import classNames from "classnames/bind";
import { Link, useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBars, faTrash, faPenFancy, faXmark, faPlus, faRefresh } from '@fortawesome/free-solid-svg-icons';
import ConfigRoutes from '../../config/routes'
import { HealthyMenuAdmin } from '../../assets/image'
import styles from './ManageTopics.module.scss'
import { StoreContext } from '../../store';
import { addDishAdmin, deleteDishAdmin, editDishAdmin, getAllDishesAdmin, getAllTopicsAdmin, getDetailDishAdmin } from '../../API/adminRequest';
import Avatar from '../../layouts/components/proper/Avatar';
import { Stack, TablePagination } from "@mui/material";

const cx = classNames.bind(styles)

function Learning() {
    const context = useContext(StoreContext)
    const [searchPar] = useSearchParams()
    const [dishes, setDishes] = useState([])
    const [dishesDetail, setDishesDetail] = useState({})
    const [active, setactive] = useState('')
    const [name, setName] = useState('')
    const [typeoffood, setTypeoffood] = useState('')
    const [description, setDescription] = useState('')
    const [ingredient, setIngredient] = useState('')
    const [methob, setMethob] = useState('')
    const [image, setImage] = useState('')
    const [type0fgroup, setType0fgroup] = useState('')
    const refFile = useRef()
    const dataUser = JSON.parse(localStorage.getItem('currentUser'))

    const location = useLocation()
    const navigate = useNavigate();
    // const {  } = useParams()
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
    const getDataTopics = async () => {
        try {
            const { data } = await getAllDishesAdmin({ page: page + 1, limit: rowsPerPage });
            if (data) {
                setDishes(data.dishes || []);
                setTotalPage(data.totalPages || 0);
            }
        } catch (error) {
            toast.error("Lỗi server", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
            });
        }
    };
    useEffect(() => {
       
        getDataTopics();
    }, [page, rowsPerPage]);



    const handleSubmitEdit = async () => {
        try {
            const format = new FormData()
            format.append('image', image);
            format.append('type0fgroup', type0fgroup);
            format.append('typeofffood', typeoffood);
            format.append('description', description);
            format.append('ingredient', ingredient);
            format.append('methob', methob);
            format.append('name', name);
            const res = await editDishAdmin(searchPar.get('id'), format)
            if (res.status===200) {
                toast.success("Sửa món ăn thành công", {
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

    const onHandleRefresh = () => {
        setName('')
        setType0fgroup('')
        setImage('')
        setDescription('')
        setTypeoffood('')
        setMethob('')
        setIngredient('')
        navigate({
            pathname: '/admin/addFoods'
        })
    }
    async function handleOnlickId(id) {
        try {
            const { data } = await getDetailDishAdmin(id)
            if (data) {
                // setDishesDetail({ ...data.data })
                console.log(data)
                setName(data.data.title)
                setTypeoffood(data.data.type0fgroup)
                setDescription(data.data.description)
                setImage(data.data.image_path)
                setType0fgroup(data.data.typeoffood)
                setIngredient(data.data.ingredient)
                setMethob(data.data.methob)
                setactive("stepitem-active")
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
    const handleAdddishes = async () => {
        try {
            const format = new FormData()
            format.append('image', image);
            format.append('type0fgroup', type0fgroup);
            format.append('typeofffood', typeoffood);
            format.append('description', description);
            format.append('ingredient', ingredient);
            format.append('methob', methob);
            format.append('name', name);
            const { data } = await addDishAdmin(format)
            if (data) {
                toast.success("Thêm món ăn thành công", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                getDataTopics()
                onHandleRefresh()
            } else {
                toast.warn("Lỗi! Vui lòng điền đầy đủ thông tin", {
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
    const handleDeletedishes = async () => {
        try {

            const { data } = await deleteDishAdmin(searchPar.get('id'))
            if (data.success === 1) {
                toast.success("Xóa món ăn thành công", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                getDataTopics()
                onHandleRefresh()
            } else {
                toast.warn("Xóa món ăn thất bại", {
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
    useEffect(() => {
        return () => {
            image && URL.revokeObjectURL(image?.preview)
        }
    }, [image])

    const handePreviewAvatar = (e) => {
        const input = e.target
        const selectedImage = input.files[0]
        if (!selectedImage) {
            setImage(null)
            return
        }
        input.value = ""
        selectedImage.preview = URL.createObjectURL(selectedImage)
        setImage(selectedImage)
    }

    return <> <section className={cx('module-grid', 'module-fullwidth')} style={{ maxWidth: '1920px' }}>

        <div className={cx('header-wapper')}>
            <Link className={cx('header-logo')} to={ConfigRoutes.managedishess}>
                <img alt='HealthyMenuAdmin' src={HealthyMenuAdmin} />
            </Link>
            <div className={cx('header-dishes-title')}>HealthyMenu Admin</div>
            <div className={cx('header-actions')}>
                <Avatar>
                    <button onClick={context.handleAvater} className={cx('action-bnt')}>

                        <img alt='logo' className={cx('header-icon')} src={dataUser.avatar ? process.env.REACT_APP_BACKEND_URL + '/user/' + dataUser.nickname + '/' + dataUser.avatar : "https://bootdey.com/img/Content/avatar/avatar7.png"} />
                        <span className={cx('header-label')}>{dataUser.Username}</span>
                    </button>
                </Avatar>
            </div>
        </div>
        {context.list && <> <div className={cx('track-wrapper')}>
            <div className={cx('container')}>
                <header className={cx('header')}>
                    <h1 className={cx('heading')}>Các món ăn</h1>
                    <button className={cx('track-close-btn')}>
                        <FontAwesomeIcon onClick={context.handleList} icon={faXmark} />
                    </button>
                </header>
                <div className={cx('body')}>
                    {dishes.length > 0 ? <>{
                    dishes.map((crs, index) => 
                    <div key={crs.food_id} className={cx('trackitem-step-list', 'trackitem-open')}>
                        <div className={cx('stepitem-wrapper', searchPar.get('id') === crs.food_id ? active : '')}>
                            <div onClick={() => {
                                handleOnlickId(crs.food_id)
                                navigate({
                                    pathname: location.pathname,
                                    search: `?id=${crs.food_id}`,
                                })
                            }
                            } className={cx('stepitem-info')}>
                                <h3 className={cx('stepitem-title')}>{index+ 1+rowsPerPage*page}.{crs.title}</h3>

                            </div>
                        </div>

                    </div> ) }
                   
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
                    : 
                    <span style={{ marginLeft: "15px" }}>Chưa có món ăn nào</span>}
                  
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
                                    <label className={cx('label')}>Tên Món Ăn</label>
                                    <div className={cx('input-wrapper')}>
                                        <input
                                            type='text'
                                            value={name}
                                            placeholder='Nhập tên món ăn...'
                                            className={cx('inputs', 'inputss', 'fix-fontsize')}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className={cx('text-input')}>
                                    <label className={cx('label')}>Loại Món Ăn</label>
                                    <div className={cx('input-wrapper')}>
                                        <select className={cx('inputs', 'inputss', 'fix-fontsize',`${typeoffood?"":'disabled'}`)} disabled={typeoffood?false:true} value={type0fgroup} onChange={(e) => setType0fgroup(e.target.value)}>
                                        {!typeoffood&&<option value="">-- Vui lòng chọn nhóm món ăn trước --</option>}
                                            {typeoffood==="Món ăn"&&<>
                                                <option value="">-- Chọn loại đồ ăn --</option>
                                            <option value="Món chính" >Món chính</option>
                                            <option value="Ăn vật">Ăn vật</option>
                                            <option value="Món chay">Món chay</option>
                                            <option value="Món khác">Món khác</option>
                                            </>
                                            }
                                            {typeoffood==="Đồ uống"&&<>
                                                <option value="">-- Chọn loại thức uống --</option>
                                            <option value="Nước ép" >Nước ép</option>
                                            <option value="Sinh tố">Sinh tố</option>
                                            <option value="Sữa hạt">Sữa hạt</option>
                                            <option value="Loại khác">Loại khác</option>
                                            </>}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('form-2')}>
                               
                                <div className={cx('text-input')}>
                                    <label className={cx('label')}>Nhóm món ăn</label>
                                    <div className={cx('input-wrapper')}>
                                        <select className={cx('inputs', 'inputss', 'fix-fontsize')} value={typeoffood} onChange={(e) => setTypeoffood(e.target.value)}>
                                            <option value="">-- Chọn nhóm món ăn --</option>
                                            <option value="Món ăn" >Món ăn</option>
                                            <option value="Đồ uống">Đồ uống</option>
                                        </select>
                                    </div>

                                </div>
                                <div className={cx('text-input')}>
                                    <label htmlFor="avatar" className={cx('label')}>Ảnh</label>
                                    <div className={cx('input-wrapper')}>
                                        <input
                                            type='file'
                                            ref={refFile}
                                            id='avatar'
                                            className={cx('inputs', 'inputss', 'fix-fontsize')}
                                            // onBlur={onBlurPhone}
                                            accept='image/jpg, image/jpeg, image/png' style={{ display: "none" }}
                                            onChange={(e) => handePreviewAvatar(e)}

                                        />
                                        <div className={cx('inputs', 'inputss', 'fix-fontsize', 'btn-file')} onClick={() => {
                                            if (refFile.current) {
                                                refFile.current.click()
                                            }
                                        }}>
                                            Tải ảnh
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('textarea-part1')}>
                        <div className={cx('textarea-input')}>
                            <label className={cx('label')}>Thành Phần Dinh Dưỡng</label>
                            <div className={cx('input-wrapper')}>
                                <textarea
                                    placeholder='Nhập nội dung...'
                                    value={description}
                                    className={cx('module-testarea', 'fix-fontsize')}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={cx('textarea-input')}>
                            <label className={cx('label')}>Nguyên Liệu</label>
                            <div className={cx('input-wrapper')}>
                                <textarea
                                    placeholder='Nhập nội dung...'
                                    value={ingredient}
                                    className={cx('module-testarea', 'fix-fontsize')}
                                    onChange={(e) => setIngredient(e.target.value)}
                                />
                            </div>
                        </div>
                        </div>
                        <div className={cx('textarea-part2')}>
                            <label className={cx('label')}>Cách làm</label>
                            <div className={cx('input-wrapper')}>
                                <textarea
                                    placeholder='Nhập nội dung...'
                                    value={methob}
                                    className={cx('module-testarea', 'fix-fontsize')}
                                    onChange={(e) => setMethob(e.target.value)}
                                />
                            </div>
                        </div>

                    </form>

                </div>

            </div>
            <div className={cx('video-wrapper')}>
                <div className={cx('learning-center')}>
                    <div className={cx('videoplayer-wrapper')}>
                        <div className={cx('videoplayer-player')} style={{ width: '100%', height: '100%', }}>
                            <div style={{ width: '100%', height: '100%', backgroundSize: ' cover', backgroundPosition: 'center center', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: `url("${image?.preview ? image.preview : process.env.REACT_APP_BACKEND_URL + '/' + image}")` }}>

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
            <button onClick={handleAdddishes} className={cx('actionBar-bnt', 'actionBar-success')}>
                <FontAwesomeIcon icon={faPlus} />
                <span>Thêm</span>
            </button>
            <button onClick={handleDeletedishes} className={cx('actionBar-bnt', 'actionBar-primary')}>
                <FontAwesomeIcon icon={faTrash} />
                <span>Xóa</span>
            </button>
            <button onClick={handleSubmitEdit} className={cx('actionBar-bnt', 'actionBar-edit')}>
                <span>Sửa</span>
                <FontAwesomeIcon icon={faPenFancy} />
            </button>
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
export default Learning