import classNames from "classnames/bind";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faArrowRight, faStar } from '@fortawesome/free-solid-svg-icons';
import Button from '../../layouts/components/Button';
import robot from '../../assets/image/robot.png'
import ConfigRoutes from '../../config/routes'
import styles from './Study.module.scss'
// import ChatBox from '../../layouts/components/ChatBox';
import { logo } from '../../assets/image';
import { getAllTopics } from "../../API/courses_TopicsRequest";
const cx = classNames.bind(styles)

function Study() {
    // const allCoures = JSON.parse(localStorage.getItem('AllCourses'))
    const [dataTopics, setDataTopics] = useState([]);
    const [dataEnglish, setDataEnglish] = useState([]);
    useEffect(() => {
        const getTopics = async () => {
            try {
                const { data } = await getAllTopics()
                if (data) {
                    setDataTopics([...data.data1])
                    setDataEnglish([...data.data2])

                    const allDatas = { topics: [...data.data1], english: [...data.data2] }
                    localStorage.setItem("AllCourses", JSON.stringify(allDatas))
                }
            }
            catch {
                localStorage.removeItem('token');
                const data = { Username: null, email: null, admin: null, avatar: null }
                localStorage.setItem('currentUser', JSON.stringify(data));
            }
        }
        getTopics()

    }, [])

    return <> <section className={cx('module-grid', 'module-fullwidth')} style={{ maxWidth: '1920px' }}>

        <div className={cx('wrapper-content')}>
            <div className={cx('content-top')}>
                <h1 className={cx('path')}>Khóa học</h1>
                <div className={cx('text')}>
                    <p className={cx('text-inner')}>Các khóa học được thiết kế phù hợp cho cả người mới, nhiều khóa học miễn phí, chất lượng, nội dung dễ hiểu.</p>
                </div>
            </div>
            {dataTopics.length > 0 &&
                <div className={cx('course')}>
                    <div>
                        <div className={cx('heading-wrapper')}>
                            <h2 className={cx('heading')}>
                                <Link rel='noreferrer' className={cx('wrapper')} to={ConfigRoutes.pathLearning} target="_self">
                                    Khóa học lập trình
                                    <span className={cx('view-all-icon')}><FontAwesomeIcon icon={faArrowRight} /></span>
                                </Link>
                            </h2>
                            <Link rel='noreferrer' className={cx('view-all')} to={ConfigRoutes.pathLearning} target="_self">Xem Thêm
                                <FontAwesomeIcon icon={faChevronRight} /></Link>
                        </div>
                    </div>
                    <div className={cx('body')}>
                        <section className={cx('module-row')}>
                            {dataTopics.map((val) => {
                                return (<section key={val._id} className={cx('module-col', 'module-c-12', 'module-m-4', 'module-l-3', 'res-module')}>
                                    {val.is_resgister ? <div className={cx('item', 'course-item')}>
                                        <div className={cx('image-content')}>
                                            <Link className={cx('thumb', 'has-link')} to={'/Learning/' + val.slug} target='_self' style={{ backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL + '/topic/' + val.image})` }}>
                                                <button className={cx('btn', 'cta-btn')} >{('Tiếp tục học')}</button>
                                            </Link>
                                        </div>
                                        <div className={cx('content-wrapper')}>
                                            <Link to={'/Learning/' + val.slug} className={cx('context-content')}>
                                                <h3 className={cx('title')}>
                                                    <p >{val.name}</p>
                                                </h3>
                                                <div className={cx('stars')}>
                                                    <FontAwesomeIcon icon={faStar} className={cx('fix-star')} />
                                                    <FontAwesomeIcon icon={faStar} className={cx('fix-star')} />
                                                    <FontAwesomeIcon icon={faStar} className={cx('fix-star')} />
                                                    <FontAwesomeIcon icon={faStar} className={cx('fix-star')} />
                                                    <FontAwesomeIcon icon={faStar} className={cx('fix-star')} />
                                                    <span className={cx('text-mutes')}>
                                                        <span className={cx('fix-font')}>5.0</span>
                                                    </span>
                                                </div>
                                                <div className={cx('slogan')}>
                                                    <span className={cx('text-slogan')}>From LE</span>
                                                </div>
                                            </Link>
                                            <div className={cx('author-content')}>
                                                <span>Tác giả/Dịch giả: </span>
                                                <Link className={cx('father-logo')} to={'/Learning/' + val.slug}>
                                                    <img className={cx('logo-content')} src={logo} alt='logo' />
                                                </Link>
                                            </div>
                                        </div>
                                    </div> : <div className={cx('item', 'course-item')}>
                                        <Link to={'/courses/' + val.slug} target='_self' className={cx('image-content')}>
                                            <div className={cx('thumb', 'has-link')} style={{ backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL + '/topic/' + val.image})` }}>
                                                <button className={cx('btn', 'cta-btn')} >{('Xem khóa học')}</button>
                                            </div>
                                        </Link>
                                        <div className={cx('content-wrapper')}>
                                            <Link to={'/courses/' + val.slug} target='_self' className={cx('context-content')}>
                                                <h3 className={cx('title')}>
                                                    <p >{val.name}</p>
                                                </h3>
                                                <div className={cx('stars')}>
                                                    <FontAwesomeIcon icon={faStar} className={cx('fix-star')} />
                                                    <FontAwesomeIcon icon={faStar} className={cx('fix-star')} />
                                                    <FontAwesomeIcon icon={faStar} className={cx('fix-star')} />
                                                    <FontAwesomeIcon icon={faStar} className={cx('fix-star')} />
                                                    <FontAwesomeIcon icon={faStar} className={cx('fix-star')} />
                                                    <span className={cx('text-mutes')}>
                                                        <span className={cx('fix-font')}>5.0</span>
                                                    </span>
                                                </div>
                                                <div className={cx('slogan')}>
                                                    <span className={cx('text-slogan')}>From LE</span>
                                                </div>
                                            </Link>
                                            <div className={cx('author-content')}>
                                                <span>Tác giả/Dịch giả: </span>
                                                <Link to={'/courses/' + val.slug} target='_self' className={cx('father-logo')} >
                                                    <img className={cx('logo-content')} src={logo} alt='logo' />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>}
                                </section>)
                            })
                            }

                        </section>
                    </div>
                </div>
            }
            {dataEnglish.length > 0 &&
                <div className={cx('course')}>
                    <div>
                        <div className={cx('heading-wrapper')}>
                            <h2 className={cx('heading')}>
                                <Link rel='noreferrer' className={cx('wrapper')} to={ConfigRoutes.pathLearning} target="_self">
                                    Khóa học tiếng anh
                                    <span className={cx('view-all-icon')}><FontAwesomeIcon icon={faArrowRight} /></span>
                                </Link>
                            </h2>
                            <Link rel='noreferrer' className={cx('view-all')} to={ConfigRoutes.pathLearning} target="_self">Xem Thêm
                                <FontAwesomeIcon icon={faChevronRight} /></Link>
                        </div>
                    </div>
                    <div className={cx('body')}>
                        <section className={cx('module-row')}>
                            {dataEnglish.map((eng) => {
                                return (<section key={eng._id} className={cx('module-col', 'module-c-12', 'module-m-4', 'module-l-3', 'res-module')}>
                                    {eng.is_resgister ? <div className={cx('item', 'course-item')}>
                                        <div className={cx('image-content')}>
                                            <Link className={cx('thumb', 'has-link')} to={'/Learning/' + eng.slug} target='_self' style={{ backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL + '/topic/' + eng.image})` }}>
                                                <button className={cx('btn', 'cta-btn')} >{('Tiếp tục học')}</button>
                                            </Link>
                                        </div>
                                        <div className={cx('content-wrapper')}>
                                            <Link to={'/Learning/' + eng.slug} className={cx('context-content')}>
                                                <h3 className={cx('title')}>
                                                    <p >{eng.name}</p>
                                                </h3>
                                                <div className={cx('stars')}>
                                                    <FontAwesomeIcon icon={faStar} className={cx('fix-star')} />
                                                    <FontAwesomeIcon icon={faStar} className={cx('fix-star')} />
                                                    <FontAwesomeIcon icon={faStar} className={cx('fix-star')} />
                                                    <FontAwesomeIcon icon={faStar} className={cx('fix-star')} />
                                                    <FontAwesomeIcon icon={faStar} className={cx('fix-star')} />
                                                    <span className={cx('text-mutes')}>
                                                        <span className={cx('fix-font')}>5.0</span>
                                                    </span>
                                                </div>
                                                <div className={cx('slogan')}>
                                                    <span className={cx('text-slogan')}>From LE</span>
                                                </div>
                                            </Link>
                                            <div className={cx('author-content')}>
                                                <span>Tác giả/Dịch giả: </span>
                                                <Link className={cx('father-logo')} to={'/Learning/' + eng.slug}>
                                                    <img className={cx('logo-content')} src={logo} alt='logo' />
                                                </Link>
                                            </div>
                                        </div>
                                    </div> : <div className={cx('item', 'course-item')}>
                                        <div className={cx('image-content')}>
                                            <Link to={'/courses/' + eng.slug} target='_self' className={cx('thumb', 'has-link')} style={{ backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL + '/topic/' + eng.image})` }}>
                                                <button className={cx('btn', 'cta-btn')} >{('Xem khóa học')}</button>
                                            </Link>
                                        </div>
                                        <div className={cx('content-wrapper')}>
                                            <Link to={'/courses/' + eng.slug} target='_self' className={cx('context-content')}>
                                                <h3 className={cx('title')}>
                                                    <p >{eng.name}</p>
                                                </h3>
                                                <div className={cx('stars')}>
                                                    <FontAwesomeIcon icon={faStar} className={cx('fix-star')} />
                                                    <FontAwesomeIcon icon={faStar} className={cx('fix-star')} />
                                                    <FontAwesomeIcon icon={faStar} className={cx('fix-star')} />
                                                    <FontAwesomeIcon icon={faStar} className={cx('fix-star')} />
                                                    <FontAwesomeIcon icon={faStar} className={cx('fix-star')} />
                                                    <span className={cx('text-mutes')}>
                                                        <span className={cx('fix-font')}>5.0</span>
                                                    </span>
                                                </div>
                                                <div className={cx('slogan')}>
                                                    <span className={cx('text-slogan')}>From LE</span>
                                                </div>
                                            </Link>
                                            <div className={cx('author-content')}>
                                                <span>Tác giả/Dịch giả: </span>
                                                <Link to={'/courses/' + eng.slug} target='_self' className={cx('father-logo')} >
                                                    <img className={cx('logo-content')} src={logo} alt='logo' />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>}
                                </section>)

                            })
                            }
                        </section>
                    </div>
                </div>
            }
            <div className={cx('content-final')}>
                <div className={cx('info')}>
                    <h2>Xem lộ trình nào</h2>
                    <p>Các khóa học được thiết kế phù hợp cho người mới, lộ trình học rõ ràng, nội dung dễ hiểu.</p>
                    <Button fomal to={ConfigRoutes.pathLearning}>Xem lộ trình</Button>
                </div>
                <div className={cx('image')}>
                    <img src={robot} alt='robot' />
                </div>
            </div>
        </div>
    </section>
        {/* <ChatBox /> */}
    </>
}
export default Study