import { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import classNames from "classnames/bind";
import { faAdd, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfigRoutes from '../../config/routes';
import styles from './MangeCourses.module.scss';
import { HealthyMenuAdmin } from "../../assets/image";
import Button from "../../layouts/components/Button";
import { getAllDishesAdmin } from "../../API/adminRequest";
import Avatar from '../../layouts/components/proper/Avatar';
import { StoreContext } from "../../store";
import { Stack, TablePagination } from "@mui/material";
import { useDebouncedValue } from '@mantine/hooks';
import SearchBox from "../../layouts/components/searchBox/SearchBox";
// import SearchBox from "../../layouts/components/search";

const cx = classNames.bind(styles);

function ManageCourses() {
    const [topics, setTopics] = useState([]);
    const context = useContext(StoreContext);
    const dataUser = JSON.parse(localStorage.getItem('currentUser'));
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(12);
    const [totalPage, setTotalPage] = useState(0);
    const [search, setSearch] = useState('');
    const [searchDish] = useDebouncedValue(search, 500);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        const getDataTopics = async () => {
            try {
                const res = await getAllDishesAdmin({ page: page + 1, limit: rowsPerPage,searchDish });
                console.log("res",res)
                if (res.status===200) {
                    setTopics(res.data.dishes || []);
                    setTotalPage(res.data.totalPages || 0);
                }
                if(res.status===500 && !res.data.auth){
                    const data = { Username: null, email: null, admin: null, avatar: null }
                    localStorage.setItem('currentUser', JSON.stringify(data))
                    localStorage.removeItem('token');
                     window.location.href = '/login'
                } 
               
            } catch (error) {
                console.log("error.response",error.response)
                toast.error("Lỗi server", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                });
                if(error.response?.status===401||!error.response){
                    console.log("vovovo")
                    const data = { Username: null, email: null, admin: null, avatar: null }
                    localStorage.setItem('currentUser', JSON.stringify(data))
                    localStorage.removeItem('token');
                     window.location.href = '/login'
                }               
            }
        };
        getDataTopics();
    }, [page, rowsPerPage,searchDish]);

    return (
        <>
            <section className={cx('module-grid', 'module-fullwidth')} style={{ maxWidth: '1920px' }}>
                <div className={cx('header-wapper')}>
                    <Link className={cx('header-logo')} to={ConfigRoutes.manageCourses}>
                        <img alt='HealthyMenu Admin' src={HealthyMenuAdmin} />
                    </Link>
                    <div className={cx('header-course-title')}>HealthyMenu Admin</div>
                    <div className={cx('header-actions')}>
                    <Avatar>
                    <button onClick={context.handleAvater} className={cx('action-bnt')}>
                        <img alt='logo' className={cx('header-icon')} src={dataUser.avatar ? process.env.REACT_APP_BACKEND_URL + '/user/' + dataUser.nickname + '/' + dataUser.avatar : "https://bootdey.com/img/Content/avatar/avatar7.png"} />
                        <span className={cx('header-label')}>{dataUser.Username}</span>
                    </button>
                </Avatar>
                    </div>
                </div>
                <div className="container">
                    <div className={cx('course')}>
                        <div>
                            <div className={cx('heading-wrapper', 'heading-margin')} style={{marginBottom:"10px"}}>
                                <h2 className={cx('heading')}>
                                    <Link className={cx('wrapper')} to={ConfigRoutes.pathLearning} target="_self">
                                        Tất Cả Các Món Ăn
                                    </Link>
                                </h2>
                                <Stack direction={'row'} gap={'10px'}>
                                <SearchBox
                        inputValue={search || ''}
                        placeholder={`Nhập món ăn cần tìm...`}
                        onChange={(v) => {
                            setSearch( v.target.value);
                            // if (v.target.value === '') {
                            //     setPage(0);
                            // }
                        }}
                    />
                                <button className={cx('bnt-add-topics')}>
                                    <Link className={cx('wrapper1')} to={ConfigRoutes.ManageTopics} target="_self">
                                        <FontAwesomeIcon className={cx('icon-add')} icon={faAdd} />
                                        Thêm Món Ăn
                                    </Link>
                                </button>
                                </Stack>
                            </div>
                        </div>
                        <div className={cx('body')}>
                            <section className={cx('module-row')}>
                                {topics.length > 0 ? topics.map((val) => (
                                    <section key={val.food_id} className={cx('module-col', 'module-c-12', 'module-m-4', 'module-l-3', 'res-module')}>
                                        <div className={cx('item', 'course-item')}>
                                            <div className={cx('image-content')}>
                                                <Link 
                                                    className={cx('thumb', 'has-link')} 
                                                    to={`/admin/manage-foods/${val.food_id}`} 
                                                    target='_self' 
                                                    style={{ backgroundImage: `url(${val.image_path?process.env.REACT_APP_BACKEND_URL+'/'+val.image_path : HealthyMenuAdmin})` }}>
                                                    <Button 
                                                        normal 
                                                        className={cx('btn', 'cta-btn')} 
                                                        to={`/admin/manage-foods/${val.food_id}`}>
                                                        Chỉnh sửa
                                                    </Button>
                                                </Link>
                                            </div>
                                            <div className={cx('content-wrapper')}>
                                                <Link to={`/admin/manage-foods/${val.food_id}`} className={cx('context-content')}>
                                                    <h3 className={cx('title')}>
                                                        <Link target='_self' to={`/admin/manage-foods/${val.food_id}`}>{val.title}</Link>
                                                    </h3>
                                                    <div className={cx('stars')}>
                                                        {[...Array(5)].map((_, idx) => (
                                                            <FontAwesomeIcon key={idx} icon={faStar} className={cx('fix-star')} />
                                                        ))}
                                                        <span className={cx('text-mutes')}>
                                                            <span className={cx('fix-font')}>5.0</span>
                                                        </span>
                                                    </div>
                                                    <div className={cx('slogan')}>
                                                        <span className={cx('text-slogan')}>From HealthyMenu</span>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </section>
                                )) : <span style={{ fontSize: "larger", marginLeft: '15px' }}>Admin chưa đăng bất kỳ món ăn nào</span>}
                            </section>
                            {totalPage > 1 &&
                                <Stack alignItems="center" mt="auto" display="flex">
                                    <TablePagination
                                        component="div"
                                        count={totalPage * rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        rowsPerPage={rowsPerPage||10}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        labelRowsPerPage={"Số hàng mỗi trang"}
                                        sx={{
                                            '.MuiTablePagination-toolbar': {
                                                minHeight: 64,
                                            },
                                            '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                                                fontSize: '2rem',
                                            },
                                            '.MuiTablePagination-actions .MuiIconButton-root': {
                                                fontSize: '2.5rem',
                                            },
                                            '.MuiTablePagination-input': {
                                                fontSize: '2rem',
                                            },
                                        }}
                                    />
                                </Stack>}
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    );
}

export default ManageCourses;
