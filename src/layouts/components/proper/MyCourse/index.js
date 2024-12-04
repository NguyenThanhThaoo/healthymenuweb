import { useEffect, useState } from 'react'
import Tippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
//eslint-disable-next-line
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
//eslint-disable-next-line
import vi from 'timeago.js/lib/lang/vi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './MyCourse.module.scss'
import Button from '../../Button'
import ConfigRoutes from '../../../../config/routes'
import { getAllTopicsRegisted } from '../../../../API/courses_TopicsRequest'

const cx = classNames.bind(styles)
timeago.register('vi', vi)
function MyCourse() {
    const [topicRegisted, setTopicRegisted] = useState([])
    const [course, setCourse] = useState(false);
    const showCourse = () => setCourse(true);
    const hideCourse = () => setCourse(false);

    useEffect(() => {
        const getAllTopicRegisted = async () => {
            try {
                const { data } = await getAllTopicsRegisted()
                if (data) {
                    setTopicRegisted([...data.datas])  //se crea un nuevo array con los datos de la api y se lo asignamos a topicRegist
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

        if (course) {
            getAllTopicRegisted()
        }

    }, [course])
    return (<>
        <Tippy
            interactive
            visible={course} onClickOutside={hideCourse}
            placement='bottom-end'
            render={attrs => (
                <div className={cx('courses-o')} tabIndex="-1" {...attrs}>
                    <div className={cx('course-heading')}>
                        <h6>Khóa học của tôi</h6>
                        <Button to={ConfigRoutes.MyOnwCourse}>Xem tất cả</Button>
                    </div>
                    <div className={cx('content')}>
                        {topicRegisted.length <= 0 ? <p className={cx('noregisted')}>Bạn chưa đăng ký bất kỳ khóa học nào!</p> :
                            topicRegisted.map((course, index) => <div key={course._id} className={cx('body')}>
                                <Button className={cx('fix-button')} to={"/Learning/" + course.slug}>
                                    <img className={cx('thumnail')} src={process.env.REACT_APP_BACKEND_URL + '/topic/' + course.image} alt='' />
                                </Button>
                                <div className={cx('body-child')}>
                                    <h3><Button className={cx('h3')} to={"/Learning/" + course.slug}>{course.name}</Button></h3>
                                    {course.last_completed_at ? <>
                                        <p className={cx('hours')}>Học
                                            <TimeAgo
                                                datetime={course.last_completed_at}
                                                locale='vi'
                                            /></p>
                                        <Button className={cx('contiunue-Learn')} to={"/Learning/" + course.slug}>Tiếp tục học</Button></> : <>
                                        <p className={cx('hours')}>Bạn chưa học khóa học này</p>
                                        <Button className={cx('contiunue-Learn')} to={"/Learning/" + course.slug}>Bất đầu học</Button></>
                                    }
                                </div>
                            </div>)

                        }

                    </div>


                </div>
            )}>
            <button onClick={!course ? showCourse : hideCourse} className={cx('Own-course')}>
                Khóa học của tôi
            </button>
        </Tippy>
        <ToastContainer />
    </>
    )
}
export default MyCourse