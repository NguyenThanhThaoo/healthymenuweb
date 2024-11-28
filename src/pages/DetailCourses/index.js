import { useContext, useEffect, useRef, useState } from 'react';
import classNames from "classnames/bind";
import { Link,useParams, useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBars, faTrash, faPenFancy, faXmark, faPlus, faRefresh } from '@fortawesome/free-solid-svg-icons';
import ConfigRoutes from '../../config/routes'
import { HealthyMenuAdmin } from '../../assets/image'
import styles from './DetailCourses.module.scss'
import { StoreContext } from '../../store';
import { addDishAdmin, deleteDishAdmin, editDishAdmin, getAllDishesAdmin, getAllTopicsAdmin, getDetailDishAdmin } from '../../API/adminRequest';
import Avatar from '../../layouts/components/proper/Avatar';

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
    const { slug } = useParams()
    const location = useLocation()
    const navigate = useNavigate();
    // const {  } = useParams()


    const handleSubmitEdit = async (slug) => {
        try {
            const format = new FormData()
            format.append('image', image);
            format.append('type0fgroup', type0fgroup);
            format.append('typeofffood', typeoffood);
            format.append('description', description);
            format.append('ingredient', ingredient);
            format.append('methob', methob);
            format.append('name', name);
            const res = await editDishAdmin(slug, format)
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
   
    const handleDeletedishes = async (slug) => {
        try {
console.log("ASDsad", slug)
            const { data } = await deleteDishAdmin( slug)
            if (data) {
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
                navigate({
                    pathname: '/admin/addFoods'
                })
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
    async function handleOnlickId(id) {
        try {
            const { data } = await getDetailDishAdmin(id)
            if (data) {
                setDishesDetail(data.data)
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
    useEffect(()=>{
        if(slug){
            handleOnlickId(slug)
        }
    },[slug])
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

                        <img alt='logo' className={cx('header-icon')} src={dataUser.avatar ? process.env.REACT_APP_BACKEND_URL  + dataUser.nickname + '/' + dataUser.avatar : "https://bootdey.com/img/Content/avatar/avatar7.png"} />
                        <span className={cx('header-label')}>{dataUser.Username}</span>
                    </button>
                </Avatar>
            </div>
        </div>
      
        <div className={cx('content-wrapper','content-full')}>
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
            <button onClick={()=>handleDeletedishes(dishesDetail.food_id)} className={cx('actionBar-bnt', 'actionBar-primary')}>
                <FontAwesomeIcon icon={faTrash} />
                <span>Xóa</span>
            </button>
            <button onClick={()=>handleSubmitEdit(dishesDetail.food_id)} className={cx('actionBar-bnt', 'actionBar-edit')}>
                <span>Sửa</span>
                <FontAwesomeIcon icon={faPenFancy} />
            </button>
           

        </div>

    </section>
        <ToastContainer />
    </>
}
export default Learning