import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons'
import Tippy from '@tippyjs/react/headless'
import { Wrapper as ProperWrapper } from '../proper'
import CourseItem from '../CourseItem'
import VideoItem from '../VideoItem'
import classNames from 'classnames/bind'
import styles from './Search.module.scss'
import useDebounce from '../../../hooks/useDebounce'
import { Link } from 'react-router-dom'
import ConfigRoutes from '../../../config/routes'
import { searchT_C_Blog } from '../../../API/courses_TopicsRequest'


const cx = classNames.bind(styles)

function Search() {

    const [searchValue, setSearchValue] = useState('')
    const [serachResultTopics, setSearchResultTopics] = useState([])
    const [serachResultCourses, setSearchResultCourses] = useState([])
    const [serachResultBlogs, setSearchResultBlogs] = useState([])
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const debounce = useDebounce(searchValue, 500)
    const refInput = useRef()

    useEffect(() => {
        const searchData = async (debounce) => {
            try {
                if (!debounce.trim()) {
                    setSearchResultTopics([])
                    setSearchResultCourses([])
                    return
                }
                setLoading(true)
                const { data } = await searchT_C_Blog(debounce)
                if (data.success === 1) {
                    setTimeout(() => {
                        setLoading(false)
                        setSearchResultTopics(data.topicDatas)
                        setSearchResultCourses(data.courseDatas)
                    }, 500)
                } else if (data.success === 2) {
                    setTimeout(() => {
                        setLoading(false)
                        setSearchResultTopics(data.datas)
                        setSearchResultCourses(data.datas)
                    }, 500)
                }
            }
            catch {
                setLoading(false)
            }
        }
        searchData(debounce)

    }, [debounce])

    const handleClear = () => {
        setSearchValue('')
        setSearchResultTopics([])
        setSearchResultCourses()
        refInput.current.focus()

    }

    const handleClickOutSide = () => {
        setShow(false)
    }

    return (<Tippy
        interactive
        visible={show && searchValue?.length > 0}
        render={attrs => (
            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                <ProperWrapper>
                    {!loading && (serachResultTopics?.length > 0 || serachResultBlogs?.length > 0 || serachResultCourses?.length > 0) && <div className={cx('search-find')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <span>{`Kết quả cho '${searchValue}'`}</span>
                    </div>}
                    {!loading && serachResultTopics?.length <= 0 && serachResultBlogs?.length <= 0 && serachResultCourses?.length <= 0 && <div className={cx('search-find')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <span>{`Không tìm thấy Kết quả cho '${searchValue}'`}</span>
                    </div>}


                    {loading && <div className={cx('search-find')}>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                        <span>{`Tìm '${searchValue}'`}</span>
                    </div>}


                    {(serachResultTopics?.length > 0 || serachResultBlogs?.length > 0 || serachResultCourses?.length > 0) && <>
                        {serachResultTopics?.length > 0 ?
                            <>
                                <div className={cx('search-heading')}>
                                    <h5>KHÓA HỌC</h5>
                                    <Link to={ConfigRoutes.study}>Xem Thêm</Link>
                                </div>
                                {serachResultTopics?.map((data, index) => {
                                    if (index < 3) {
                                        return <CourseItem key={data._id} data={data} />
                                    }
                                    return ""
                                })}</> : ''
                        }

                        {serachResultCourses?.length > 0 ? <>
                            <div className={cx('search-heading')}>
                                <h5>VIDEO</h5>
                                <Link to={ConfigRoutes.study}>Xem Thêm</Link>
                            </div>
                            {serachResultCourses?.map((data, index) => {
                                if (index < 3) {
                                    return <VideoItem key={data._id} data={data} />
                                }
                                return ""
                            })}</> : ""}

                    </>

                    }

                </ProperWrapper>
            </div>
        )}
        onClickOutside={handleClickOutSide}
    >

        <div className={cx('body-search')}>
            <div>

                <div className={cx('search')}>


                    <button type='reset' className={cx('search-bnt')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    <input
                        type='text'
                        ref={refInput}
                        value={searchValue}
                        placeholder='Tiềm kiếm khóa học, bài viết, video...'
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setShow(true)}

                    />
                    {!!searchValue &&
                        <button
                            className={cx('clear')}
                            onClick={handleClear}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    }

                </div>
            </div>
        </div>



    </Tippy>
    )
}


export default Search
