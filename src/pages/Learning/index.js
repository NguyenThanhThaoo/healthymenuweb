import { Link, useParams, useSearchParams, useLocation, useNavigate } from 'react-router-dom'
import classNames from "classnames/bind"
import ReactPlayer from 'react-player'
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
//eslint-disable-next-line
import vi from 'timeago.js/lib/lang/vi';
import { useCallback, useContext, useEffect, useReducer, useRef } from 'react'
import { format as fm } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faBars, faCheckCircle, faChevronLeft, faChevronRight, faHeart, faLock, faNoteSticky, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from './Learning.module.scss'
import './takeNotes.css'
import ConfigRoutes from '../../config/routes'
import { logo } from '../../assets/image'
import { StoreContext } from '../../store'
import { getListCourse, getDetailCourse, getNextCourse, getPreviousCourse, finishCourse } from '../../API/courses_TopicsRequest'
import TakeNote from '../../layouts/components/proper/takeNote'
import Button from '../../layouts/components/Button'
import TakeNotes from '../../layouts/components/Editor/takeNotes'
import { createTakeNote } from '../../API/takeNoteRequest'
import reducer, { initialState } from './reducer'
import { ACTIVECREATETAKENOTE, ACTIVETAKENOTE, HASPLAYED, PLAYING, PLAYVIDEO } from './constance'
import { setActive, setCourseDetail, setCourses, setCurrentTimeVideoPlay, setFirstID, setFoucesTime, setLastID, setTopic, setTotalTime, setValueTakeNote } from './action'

const cx = classNames.bind(styles)
timeago.register('vi', vi)

function Learning() {
    const context = useContext(StoreContext)
    const [searchPar] = useSearchParams()
    const [allInfor, dispatch] = useReducer(reducer, initialState)
    const location = useLocation()
    const navigate = useNavigate()
    const { slug } = useParams()
    const playerRef = useRef(null);
    useEffect(() => {
        const getcourseDetail = async (slug) => {
            try {
                const { data } = await getListCourse(slug)
                if (data) {
                    if (data.topics.is_resgister) {
                        dispatch(setCourses(data.topics.courses))
                        dispatch(setTopic(data.topics))
                        if (data.nextStepCourse) {
                            navigate({
                                pathname: location.pathname,
                                search: `?id=${data.nextStepCourse}`,
                            })
                        } else {
                            navigate({
                                pathname: location.pathname,
                                search: `?id=${data.firstID}`,
                            })
                        }
                        dispatch(setActive("stepitem-active"))
                        dispatch(setFirstID(data.firstID))
                        dispatch(setLastID(data.lastID))
                    }
                    else {
                        navigate({
                            pathname: '/courses/' + slug
                        })
                    }
                }
            }
            catch {
                navigate({
                    pathname: '/courses/' + slug
                })
                // toast.error("Lỗi server", {
                //     position: "top-center",
                //     autoClose: 2000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     theme: "light",
                // })
            }
        }

        getcourseDetail(slug)
        // eslint-disable-next-line
    }, [slug])

    useEffect(() => {
        const detailCourse = async (id) => {
            try {
                const { data } = await getDetailCourse(id)
                if (data) {
                    dispatch(setCourseDetail(data.course))
                    navigate({
                        pathname: location.pathname,
                        search: `?id=${data.course._id}`,
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
        if (searchPar.get('id')) {
            detailCourse(searchPar.get('id'))
        }
        // eslint-disable-next-line
    }, [searchPar.get('id')])

    const handleGetDataDetial = (data) => {
        if (data) {
            dispatch(setCourseDetail(data.course))
            navigate({
                pathname: location.pathname,
                search: `?id=${data.course._id}`,
            })
        }
    }

    const handleNextCourse = async (id) => {
        console.log('next')
        try {
            const { data } = await getNextCourse(id)
            handleGetDataDetial(data)
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
    const handlePreviousCourse = async (id) => {
        console.log('previous')
        try {
            const { data } = await getPreviousCourse(id)
            handleGetDataDetial(data)
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
    //takenote
    const handleCreateTakeNote = () => {
        dispatch({ type: PLAYING })
        dispatch({ type: ACTIVECREATETAKENOTE })
    }
    const handleActiveTakeNote = useCallback(() => {
        dispatch({ type: PLAYING })
        dispatch({ type: ACTIVETAKENOTE })
    }, [])

    const handleSetValueTakeNote = (value) => {
        dispatch(setValueTakeNote(value))
    }

    const handleSaveTakeNote = async () => {
        try {
            const datas = {
                userID: JSON.parse(localStorage.getItem('currentUser'))._id,
                courseID: allInfor.courseDetail._id,
                topicID: allInfor.dataTopics._id,
                content: allInfor.valueTakeNote,
                time: allInfor.currentTimeVideoPlay,
                lesson: allInfor.courseDetail.name

            }
            const { data } = await createTakeNote(datas)
            if (data.success === 1) {
                toast.success("Tạo ghi chú thành công", {
                    position: "top-center",
                    autoClose: 1200,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                })
                handleCreateTakeNote()
            } else {
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

    //video
    function secondsToTimeString(seconds) {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = Math.ceil(seconds % 60)
        const formattedMinutes = String(minutes).padStart(2, '0')
        const formattedSeconds = String(remainingSeconds).padStart(2, '0')
        return `${formattedMinutes}:${formattedSeconds}`
    }
    function timeToSeconds(time) {
        const [minutes, seconds] = time.split(':');
        const totalSeconds = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
        return totalSeconds;
    }
    const hanldeGetCurretnTimeOfVideo = (e) => {
        if (Math.ceil(e.playedSeconds - timeToSeconds(allInfor.currentTimeVideoPlay)) > 2 && timeToSeconds(allInfor.currentTimeVideoPlay) !== 0) {
            dispatch(setFoucesTime(allInfor.foucesTime + Math.ceil(e.playedSeconds - timeToSeconds(allInfor.currentTimeVideoPlay))))
        }
        dispatch(setCurrentTimeVideoPlay(secondsToTimeString(e.playedSeconds)))
    }
    const handleOnReady = (e) => {
        dispatch({ type: PLAYING })
        dispatch(setTotalTime(e.getDuration()))
        if (allInfor.hasPlayed) {
            // The video is being played again
            dispatch(setCurrentTimeVideoPlay('00:00'))
            dispatch(setFoucesTime(0))
        } else {
            // The video is being played for the first time
            dispatch({ type: HASPLAYED, payload: true });
        }
    };

    const handleSeekAndPlayVideo = async (time) => {
        dispatch({ type: PLAYVIDEO, payload: true })
        //         const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        //   // Use async/await to introduce the 2-second delay
        //   await delay(2000);
        setTimeout(() => {
            // Your code to execute after the 2-second delay
            playerRef.current.seekTo(timeToSeconds(time));
            setTimeout(() => {
                // Your code to execute after the 2-second delay
                dispatch({ type: PLAYING })
            }, 300)
        }, 500)
    }
    const handleFinishVideo = async (courseID, topicID, totalTime, TimeFinished) => {
        try {
            if (allInfor.foucesTime > Math.ceil(allInfor.totalTimeVideo / 4)) {
                toast.warn("Bạn đã xả quá giới hạn! Mời học lại", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            } else {
                const datas = {
                    totalTime,
                    topicID,
                    TimeFinished: timeToSeconds(TimeFinished),
                    last_completed_at: fm(new Date(), 'yyyy-MM-dd HH:mm:ss')
                }
                const { data } = await finishCourse(courseID, datas)
                if (data.success === 1) {
                    dispatch(setCourseDetail(data.course))
                    const newCourses = allInfor.dataCourses.map(val => {
                        if (val._id === data.course._id) {
                            return data.course;
                        } else {
                            if (val._id === data.nextCourseID) {
                                val.is_course_active = true
                            }
                            return val;
                        }
                    });
                    dispatch(setCourses(newCourses))
                }
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

    useEffect(() => {
        if (searchPar.get('id') && allInfor.dataTopics._id && timeToSeconds(allInfor.currentTimeVideoPlay) === Math.ceil(allInfor.totalTimeVideo / 2)
            && allInfor.currentTimeVideoPlay !== "00:00" && allInfor.totalTimeVideo != null && !allInfor.courseDetail.is_Completed) {
            handleFinishVideo(searchPar.get('id'), allInfor.dataTopics._id, allInfor.totalTimeVideo, allInfor.currentTimeVideoPlay)
        }
        // eslint-disable-next-line
    }, [searchPar.get('id'), allInfor])

    return <> <section className={cx('module-grid', 'module-fullwidth')} style={{ maxWidth: '1920px' }}>

        <div className={cx('header-wapper')}>
            <div onClick={() => navigate({
                pathname: '/'
            })} title='Rời khỏi đây' className={cx('back-bnt')}>
                <FontAwesomeIcon className={cx('header-icon')} icon={faChevronLeft} />
            </div>
            <Link className={cx('header-logo')} to={ConfigRoutes.root}>
                <img alt='logo' src={logo} />
            </Link>
            <div className={cx('header-course-title')}>{allInfor.dataTopics.name}</div>
            <div className={cx('header-actions')}>
                <button className={cx('action-bnt')} onClick={handleActiveTakeNote}>
                    <FontAwesomeIcon className={cx('header-icon')} icon={faNoteSticky} />
                    <span className={cx('header-label')}>Ghi chú</span>
                </button>

            </div>
        </div>
        {context.list && <> <div className={cx('track-wrapper')}>
            <div className={cx('container')}>
                <header className={cx('header')}>
                    <h1 className={cx('heading')}>Nội dung khóa học</h1>
                    <button className={cx('track-close-btn')}>
                        <FontAwesomeIcon onClick={context.handleList} icon={faXmark} />
                    </button>
                </header>
                <div className={cx('body')}>
                    {allInfor.dataCourses.map((crs, index) => <div key={crs._id} className={cx('trackitem-step-list', 'trackitem-open')}>
                        <div className={cx('stepitem-wrapper', searchPar.get('id') === crs._id ? allInfor.active : '', crs.is_course_active ? "" : 'stepitem-locked')}>
                            <div onClick={() => {
                                navigate({
                                    pathname: location.pathname,
                                    search: `?id=${crs._id}`,
                                })
                            }} className={cx('stepitem-info')}>
                                <h3 className={cx('stepitem-title')}>{index + 1}.{crs.name}</h3>
                            </div>
                            {crs.is_course_active || allInfor.courseDetail.is_Completed ? crs.is_Completed ? <div className={cx('stepitem-icon-box')}>
                                <FontAwesomeIcon className={cx('stepitem-state')} icon={faCheckCircle} />
                            </div> : "" :
                                <div className={cx('stepitem-icon-box')}>
                                    <FontAwesomeIcon className={cx('stepitem-state', 'stepitem-locked')} icon={faLock} />
                                </div>}
                        </div>
                    </div>
                    )}
                </div>
            </div>


        </div>
            <div className={cx('track-overlay')}></div></>}

        <div className={cx('content-wrapper', context.list ? ('') : ('content-full'))}>
            <div className={cx('video-wrapper')}>
                <div className={cx('learning-center')}>
                    <div className={cx('videoplayer-wrapper')}>
                        <div className={cx('videoplayer-player')} style={{ width: '100%', height: '100%', }}>
                            {!allInfor.playvideo ? (<div style={{ width: '100%', height: '100%', backgroundSize: ' cover', backgroundPosition: 'center center', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: `url("${process.env.REACT_APP_BACKEND_URL + '/topic/' + allInfor.courseDetail.image}")` }}>
                                <div className={cx('react-player-shadow')} style={{ background: 'radial-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 60%)', borderRadius: '64px', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div onClick={() => dispatch({ type: PLAYVIDEO, payload: true })} style={{ borderStyle: 'solid', borderWidth: ' 16px 0px 16px 26px ', borderColor: 'transparent transparent transparent white', marginLeft: '7px' }}></div>
                                </div>

                            </div>) : (<div style={{ width: '100%', height: '100%' }}>
                                <ReactPlayer
                                    url={`https://www.youtube.com/embed/${allInfor.courseDetail.videoID}`}
                                    width="100%" height="100%"
                                    controls={true}
                                    onProgress={hanldeGetCurretnTimeOfVideo}
                                    playing={allInfor.playing}
                                    onReady={handleOnReady}
                                    // onPlay={handlePlay}
                                    onEnded={() => {
                                        if (allInfor.foucesTime > Math.ceil(allInfor.totalTimeVideo / 4) && !allInfor.courseDetail.is_Completed) {
                                            toast.warn("Bạn đã xả quá giới hạn! Mời học lại", {
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
                                        dispatch(setCurrentTimeVideoPlay('00:00'))
                                        dispatch(setFoucesTime(0))
                                    }}
                                    ref={playerRef}

                                />
                            </div>)}

                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('video-content', context.list ? ('') : ('video_fullWidth'))}>
                <div className={cx('content-top')}>
                    <header>
                        <h1 className={cx('heading-heading')}>{allInfor.courseDetail.name}</h1>
                        <p className={cx('heading-update')}>
                            Cập nhật
                            <TimeAgo
                                datetime={allInfor.courseDetail.updatedAt}
                                locale='vi'
                            />
                        </p>
                    </header>
                    <button className={cx('video-addnote')} onClick={handleCreateTakeNote}>
                        <FontAwesomeIcon icon={faPlus} />
                        <span className={cx('video-label')}>Thêm ghi chú
                            <span className={cx('video-number')}>{allInfor.currentTimeVideoPlay}</span></span>
                    </button>
                </div>
                <div className={cx('markdown-wrapper')}>
                    <p>
                        Hãy đăng ký và tham gia các khóa học trên LE để học và trải nghiệm những bài học mới và đầy thú vị các bạn nhé
                    </p>
                    <ul>
                        <li>
                            Đăng ký các khóa học:
                            <Link to={ConfigRoutes.study} target='_blank'>Khóa học</Link>
                        </li>
                        <li>
                            Đăng ký Lộ trình:
                            <Link to={ConfigRoutes.pathLearning} target='_blank'>Lộ trình</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <p className={cx('power-wrapper')}>
                Love You
                <FontAwesomeIcon className={cx('power-heart')} icon={faHeart} />
                <span className={cx('power-dot')}>.</span>
                Make By LE
            </p>
        </div>
        <div className={cx('actionBar-wrapper')}>
            <Button fomal onClick={() => handlePreviousCourse(searchPar.get('id'))} disable={allInfor.firstID === searchPar.get('id')} disabled={allInfor.firstID === searchPar.get('id')}>
                <FontAwesomeIcon icon={faChevronLeft} />
                <span>Bài trước</span>
            </Button>
            {/* 'actionBar-disable', */}
            <Button primary onClick={() => handleNextCourse(searchPar.get('id'))} disable={allInfor.lastID === searchPar.get('id') || !allInfor.courseDetail.is_Completed} disabled={allInfor.lastID === searchPar.get('id') || !allInfor.courseDetail.is_Completed}>
                <span>Bài tiếp theo</span>
                <FontAwesomeIcon icon={faChevronRight} />
            </Button>
            <div className={cx('toggle-wrapper')}>
                <p>{allInfor.courseDetail.name}</p>
                {context.list ?
                    <button className={cx('toggle-btn')}>
                        <FontAwesomeIcon onClick={context.handleList} icon={faArrowRight} />


                    </button> :
                    <button className={cx('toggle-btn')}>
                        <FontAwesomeIcon onClick={context.handleList} icon={faBars} />


                    </button>
                }
            </div>

        </div>
        {allInfor.activeCreateTakeNote ?
            <div className={cx('create-takeNote', context.list ? '' : 'fullwidth')}>
                <div className={cx('create-inner')}>
                    <h2 className={cx('takeNote-heading')}>
                        Thêm ghi chú tại
                        <span>{allInfor.currentTimeVideoPlay}</span>
                    </h2>
                    {/* <DraftEditorTakeNote handleSetValueTakeNote={handleSetValueTakeNote} /> */}
                    <div className='partoftakenote'>
                        <TakeNotes handleSetValueTakeNote={handleSetValueTakeNote} />
                    </div>
                    <div className={cx('actionwrapper')}>
                        <Button normal onClick={handleCreateTakeNote} >Hủy</Button>
                        <Button primary onClick={handleSaveTakeNote} disable={allInfor.valueTakeNote === ''} disabled={allInfor.valueTakeNote === ''}>Lưu lại</Button>

                    </div>
                </div>
            </div> : ''}
    </section >
        <TakeNote handleSetValueTakeNote={handleSetValueTakeNote} valueTakeNote={allInfor.valueTakeNote} activeTakeNote={allInfor.activeTakeNote} courseID={allInfor.courseDetail._id}
            topicID={allInfor.dataTopics._id} handleActiveTakeNote={handleActiveTakeNote} handleSeekAndPlayVideo={handleSeekAndPlayVideo} />
        <ToastContainer />

    </>
}
export default Learning