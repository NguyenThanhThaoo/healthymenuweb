import classNames from 'classnames/bind'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { memo, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import styles from './takeNote.module.scss'
// import DraftEditorTakeNote from '../../Editor/takeNote';
import { deleteTakeNote, getTakeNotes, updateTakeNote } from '../../../../API/takeNoteRequest';
import TakeNotes from '../../Editor/takeNotes'
import parser from 'html-react-parser'
import { useLocation, useNavigate } from 'react-router-dom';
import { NoTN } from '../../../../assets/image';
const cx = classNames.bind(styles)

function TakeNote({ activeTakeNote, handleActiveTakeNote, topicID, courseID, valueTakeNote, handleSetValueTakeNote, handleSeekAndPlayVideo }) {
    const [activeEdit, setActiveEdit] = useState(false)
    const [dataTakeNotes, setDataTakeNotes] = useState([])
    const [typeOfSelection, setTypeOfSelection] = useState('current')
    const [currentID, setCurrentID] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const getDataTakeNotes = async (type, courseID, topicID) => {
        try {
            const { data } = await getTakeNotes(type, courseID, topicID)
            if (data.success === 1) {
                setDataTakeNotes(data.data)
            } else {
                toast.warn(data.message, {
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

        if (activeTakeNote) {
            getDataTakeNotes(typeOfSelection, courseID, topicID)
        }
    }, [typeOfSelection, courseID, topicID, activeTakeNote])

    const handleDeleteTakeNote = async (id) => {
        try {
            const { data } = await deleteTakeNote(id)
            if (data.success === 1) {
                toast("Xóa thành công", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "dark",
                })
                getDataTakeNotes(typeOfSelection, courseID, topicID)
            } else {
                toast.warn(data.message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                })
            }
        } catch {
            toast.error("Lỗi server", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            })
        }
    }
    const handleUpdateTakeNote = async (id) => {
        try {
            const datas = {
                content: valueTakeNote
            }
            const { data } = await updateTakeNote(id, datas)
            if (data.success === 1) {
                toast("Sửa thành công", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "dark",
                })
                getDataTakeNotes(typeOfSelection, courseID, topicID)
                setActiveEdit(false)

            } else {
                toast.warn(data.message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                })
            }
        } catch {
            toast.error("Lỗi server", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            })
        }
    }

    return (activeTakeNote && <><div>
        <div className={cx('wrapper', activeTakeNote ? ("") : ("closing"))}>
            <div className={cx('container')}>
                <div className={cx('closebnt')} onClick={handleActiveTakeNote}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>
                <div className={cx('body')}>
                    <div className={cx('detailRow')}>
                        <div className={cx('contentHeading')}>
                            <div className={cx('heading-wrapper')}>
                                <h4>GHI CHÚ CỦA TÔI</h4>
                                <div>
                                    <select className={cx('chapter')} value={typeOfSelection} onChange={(e) => setTypeOfSelection(e.target.value)}>
                                        <option value="current">Chương hiện tại</option>
                                        <option value="all">Tất cả các chương</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {dataTakeNotes.length > 0 ?
                            dataTakeNotes.map((value) =>
                                <div key={value._id} className={cx('detailComment')}>
                                    <div className={cx('commentBody')}>
                                        <div className={cx('itemHeader')}>
                                            <div onClick={() => {
                                                navigate({
                                                    pathname: location.pathname,
                                                    search: `?id=${value.courseID}`
                                                })
                                                handleActiveTakeNote()
                                                handleSeekAndPlayVideo(value.time)
                                            }} style={{ display: 'flex' }}>
                                                <div className={cx('time')}>
                                                    {value.time}
                                                </div>
                                                <div className={cx('title-wrapper')}>
                                                    <div className={cx('title-item')}>
                                                        {value.lesson}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('itemCrl')}>
                                                <button className={cx('btnCtr')} onClick={() => {
                                                    setActiveEdit(true)
                                                    setCurrentID(value._id)
                                                }} ><FontAwesomeIcon icon={faPencil} /></button>
                                                <button onClick={() => handleDeleteTakeNote(value._id)} className={cx('btnCtr')}><FontAwesomeIcon icon={faTrash} /></button>
                                            </div>
                                        </div>
                                        {!activeEdit ?
                                            <div className={cx('commentText')}>
                                                <div className={cx('MarkdownParser-wrapper')}>
                                                    {parser(value.content)}
                                                </div>
                                            </div> : value._id === currentID ?
                                                <div className={cx('editor-takeNote')}><TakeNotes handleSetValueTakeNote={handleSetValueTakeNote} valueOfTakeNote={value.content} />
                                                    <div className={cx('actionwrapper')}>
                                                        <button onClick={() => setActiveEdit(false)} className={cx('cancel-bnt')}>Hủy</button>
                                                        <button onClick={() => handleUpdateTakeNote(value._id)} className={cx('bnt-accept', 'bnt-active')}>Sửa</button>
                                                    </div>
                                                </div> : <div className={cx('commentText')}>
                                                    <div className={cx('MarkdownParser-wrapper')}>
                                                        {parser(value.content)}
                                                    </div>
                                                </div>
                                        }
                                    </div>


                                </div>
                            )
                            : <div style={{ textAlign: 'center' }}>
                                <img src={NoTN} alt='noTakeNote' style={{ width: '40%' }} />
                                <p style={{ marginTop: '15px', fontSize: '2rem' }}>Chưa có bất kỳ bản ghi chú nào</p>
                            </div>}

                    </div>
                </div>
            </div>
            <div className={cx('the-rest')} onClick={handleActiveTakeNote}></div>
        </div>
    </div>
        <ToastContainer /></>)
}

export default memo(TakeNote)