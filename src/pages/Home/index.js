import classNames from "classnames/bind";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChevronRight, faComment, faEye, faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { useState, useEffect } from 'react';
import "../../assets/slick/slick-theme.css";
import "../../assets/slick/slick.css";
import ConfigRoutes from '../../config/routes'
import { dataSlider, VideoLinkImage } from './data'
import { PreviousBtn, NextBtn } from './FixButton/fixButton';
import { logo } from '../../assets/image';
import styles from './sliderShow.module.scss'
import GoTop from '../../layouts/components/GoTop';
import { getAllTopics } from '../../API/courses_TopicsRequest';
const cx = classNames.bind(styles)

function Home() {
    const [dataTopics, setDataTopics] = useState([]);
    const [dataEnglish, setDataEnglish] = useState([]);
    // const user = JSON.parse(localStorage.getItem('currentUser'))
    // const navigate = useNavigate();
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

    const settings = {
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                },
            },

            {
                breakpoint: 750,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <>
            <section className={cx('module-grid', 'module-fullwidth')} style={{ maxWidth: '1920px' }}>
                <div className={cx('slide-show')}>
                    <div className={cx('wraper-slide')}>

                        <Slider {...settings}>
                            {dataSlider.map((item) => (
                                <div key={item.id} className={cx('body-card')}>
                                    <div className={cx("card-top")}>
                                        <img
                                            src={item.linkImg}
                                            alt={item.title}
                                        />
                                    </div>
                                </div>
                            ))}

                        </Slider>

                    </div>
                </div>
                <div className={cx('wrapper-content')}>
                    {dataTopics.length > 0 &&
                        <div className={cx('course')}>
                            <div>
                                <div className={cx('heading-wrapper', 'heading-margin')}>
                                    <h2 className={cx('heading')}>
                                        <Link rel='noreferrer' className={cx('wrapper')} to={ConfigRoutes.pathLearning} target="_self">
                                            Khóa học lập trình
                                            <span className={cx('view-all-icon')}><FontAwesomeIcon icon={faArrowRight} /></span>
                                        </Link>
                                    </h2>
                                    <Link rel='noreferrer' className={cx('view-all')} to={ConfigRoutes.pathLearning} target="_self">Lộ trình
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
                                                <div className={cx('image-content')}>
                                                    <Link to={'/courses/' + val.slug} target='_self' className={cx('thumb', 'has-link')} style={{ backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL + '/topic/' + val.image})` }}>
                                                        <button className={cx('btn', 'cta-btn')} >{('Xem khóa học')}</button>
                                                    </Link>
                                                </div>
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

                        </div>}
                    {dataEnglish.length > 0 && <div className={cx('course')}>
                        <div>
                            <div className={cx('heading-wrapper')}>
                                <h2 className={cx('heading')}>
                                    <Link rel='noreferrer' className={cx('wrapper')} to={ConfigRoutes.pathLearning} target="_self">
                                        Khóa học tiếng anh
                                        <span className={cx('view-all-icon')}><FontAwesomeIcon icon={faArrowRight} /></span>
                                    </Link>
                                </h2>
                                <Link rel='noreferrer' className={cx('view-all')} to={ConfigRoutes.pathLearning} target="_self">Lộ trình
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
                    </div>}
                    <div className={cx('course')}>
                        <div>
                            <div className={cx('heading-wrapper')}>
                                <h2 className={cx('heading')}>
                                    <Link rel='noreferrer' className={cx('wrapper')} to={ConfigRoutes.pathLearning} target="_self">
                                        Video nổi bật
                                        <span className={cx('view-all-icon')}><FontAwesomeIcon icon={faArrowRight} /></span>
                                    </Link>
                                </h2>
                                <Link rel='noreferrer' className={cx('view-all')} to={ConfigRoutes.pathLearning} target="_self">Xem khóa học
                                    <FontAwesomeIcon icon={faChevronRight} /></Link>
                            </div>
                        </div>
                        <div className={cx('body')}>
                            <section className={cx('module-row')}>
                                {VideoLinkImage.map((img) => {
                                    return (<section key={img.title} className={cx('module-col', 'module-c-12', 'module-m-4', 'module-l-3', 'res-module')}>
                                        <div className={cx('item', 'course-item')}>
                                            <div className={cx('image-content')}>
                                                <Link className={cx('thumb', 'has-link')} to={img.link} target='_self' style={{ backgroundImage: `url(${img.img})` }}>
                                                    <button className={cx('btn', 'cta-btn')}>Xem video</button>
                                                </Link>
                                            </div>
                                            <div className={cx('content-wrapper')}>
                                                <Link to={img.link} className={cx('context-content')}>
                                                    <h3 className={cx('title')}>
                                                        <p to={img.link}>{img.title}</p>
                                                    </h3>
                                                    <div className={cx('stars')}>
                                                        <FontAwesomeIcon className={cx('fix-color')} icon={faEye} />

                                                        <span className={cx('text-mutes')}>
                                                            <span >{img.watch}</span>
                                                        </span>
                                                        <FontAwesomeIcon icon={faThumbsUp} className={cx('fix-margin', 'fix-color')} />
                                                        <span className={cx('text-mutes')}>
                                                            <span>{img.like}</span>
                                                        </span>
                                                        <FontAwesomeIcon icon={faComment} className={cx('fix-margin', 'fix-color')} />
                                                        <span className={cx('text-mutes')}>
                                                            <span>{img.comment}</span>
                                                        </span>
                                                    </div>
                                                    <div className={cx('slogan')}>
                                                        <span className={cx('text-slogan')}>From LE</span>
                                                    </div>
                                                </Link>
                                                <div className={cx('author-content')}>
                                                    <span>Tác giả/Dịch giả: </span>
                                                    <Link className={cx('father-logo', 'display-author')} to={img.link}>
                                                        <img className={cx('logo-content', 'margin-logo')} src={logo} alt='logo' />
                                                        <img className={cx('logo-content')} src={img.author} alt='logo' />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </section>)

                                })
                                }
                            </section>

                        </div>
                    </div>
                </div>
            </section>
            <GoTop />

        </>
    )
}
export default Home