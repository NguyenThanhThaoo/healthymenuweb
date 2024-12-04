import classNames from 'classnames/bind'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect, useReducer, useRef, memo } from 'react';
//eslint-disable-next-line
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
//eslint-disable-next-line
import vi from 'timeago.js/lib/lang/vi';
import HTMLReactParser from 'html-react-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp, faEdit, faEllipsis, faFlag, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import { isEmpty } from 'validator'
import Randomstring from "randomstring";
import Tippy from '@tippyjs/react/headless'
import { Link } from 'react-scroll';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import styles from './Comment.module.scss'
import { StoreContext } from '../../../../store';
import { createComment, deleteCommentChildren, deleteCommentParent, editComment, getComment, createReactionComment } from '../../../../API/commentBlogRequest';
import { NoCM } from '../../../../assets/image';
import EditorComments from '../../Editor/comments'
import EditorReplyComments from '../../Editor/replyComment'
import Button from '../../Button'
import reducer, { initalState } from './reducer';
import { deleteReplyCommentIDs, deleteReplyIDs, setComments, setConvertReplyIDS, setDeleteMessage, setEditMessage, setReactEmojID, setRecievMessage, setReplyCommentID, setReplyCommentIDs, setReplyComments, setReplyID, setReplyIDS, setSendMessage, setShowOptionID, setTotalComments, setValueComment, setValueReplyComment } from './action';
import { ACTIVECOMMENT, ACTIVEEDITCOMMENT, ACTIVEREPLY, SHOWOPTION, SHOWREACTEMOJ, WATCHREPLY } from './constance';
import { reactDataEmoijs } from '../Comment/datareact';


const cx = classNames.bind(styles)
timeago.register('vi', vi)
function CommentBlog({ detailData }) {

    const context = useContext(StoreContext)
    const user = JSON.parse(localStorage.getItem('currentUser'))
    const [allInfoOfComments, dispatch] = useReducer(reducer, initalState)
    // const [searchPar] = useSearchParams()
    const { slug } = useParams()
    const socket = useRef()

    //comment
    const getDataComments = async (type, courseID, page, replyIDs = "") => {
        try {
            const { data } = await getComment(type, courseID, page, replyIDs)
            if (data.success === 1) {
                if (type === 'reply-Comment') {
                    const newArrayReplyComments = allInfoOfComments.replyComments.filter((val) => val.reply_id !== replyIDs)
                    dispatch(setReplyComments([...newArrayReplyComments, ...data.data]))
                } else {
                    dispatch(setComments(data.data))
                }
                dispatch(setTotalComments(data.count))
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
        if (context.commentBlogs && slug) {
            getDataComments('Comment', detailData._id, 1, "")
        }
        // eslint-disable-next-line
    }, [context.commentBlogs, slug])
    const handleGetReplyDataOneTime = (id) => {
        if (allInfoOfComments.watchReply && !allInfoOfComments.convertReplyIDs?.includes(id)) {
            getDataComments('reply-Comment', detailData._id, 1, id)

        }
    }
    const handleSetValueComment = (value) => {
        dispatch(setValueComment(value))
    }
    const handleSetValueReplyComment = (value) => {
        dispatch(setValueReplyComment(value))
    }
    const handleCreateWithComment = async (type, courseID, replyID, value) => {
        try {
            const commentableID = Randomstring.generate()
            const datas = {
                comment: value,
                commenttable_id: commentableID,
                blog_id: courseID,
                commenttable_type: type,
                reply_id: replyID
            }
            if (type === "reply-Comment") {
                dispatch(setSendMessage({ datas, user, comments: allInfoOfComments.replyComments }))
            } else {
                dispatch(setSendMessage({ datas, user, comments: allInfoOfComments.comments }))
            }
            const { data } = await createComment(datas)
            if (data.success === 1) {
                if (type === 'reply-Comment') {
                    getDataComments(type, detailData._id, 1, replyID)
                    getDataComments('Comment', detailData._id, 1, "")
                    dispatch(setValueReplyComment(''))
                    dispatch({ type: ACTIVEREPLY })
                    dispatch(deleteReplyCommentIDs(replyID))

                } else {
                    getDataComments(type, detailData._id, 1, "")
                    dispatch(setValueComment(''))
                    dispatch({ type: ACTIVECOMMENT })
                }

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
    const handleCreateComment = () => {
        handleCreateWithComment('Comment', detailData._id, null, allInfoOfComments.valueComment)
    }
    const handleCreateReplyComment = (id) => {
        handleCreateWithComment('reply-Comment', detailData._id, id, allInfoOfComments.valueReplyComment)


    }
    const hanldeDeleteCommentParent = async (commenttable_id) => {
        try {
            dispatch(setDeleteMessage({ comments: allInfoOfComments.comments, commenttable_id, blog_id: detailData._id, type: "delete" }))
            const { data } = await deleteCommentParent(commenttable_id)
            if (data.success === 1) {
                getDataComments('Comment', detailData._id, 1, "")
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
    const hanldeDeleteCommentChildren = async (firstId, commenttable_id) => {
        try {
            dispatch(setDeleteMessage({ comments: allInfoOfComments.replyComments, commenttable_id, parentID: firstId, blog_id: detailData._id, type: "delete-children" }))
            const { data } = await deleteCommentChildren(firstId, commenttable_id)
            if (data.success === 1) {
                getDataComments('reply-Comment', detailData._id, 1, firstId)
                getDataComments('Comment', detailData._id, 1, "")
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
    const handleEditComment = async (id, type) => {
        try {
            const datas = {
                comment: allInfoOfComments.valueReplyComment
            }
            if (type === "reply-Comment") {
                dispatch(setEditMessage({ ...datas, commenttable_id: id, type: "edit-replyComment", blog_id: detailData._id, comments: allInfoOfComments.replyComments }))
            } else {
                dispatch(setEditMessage({ ...datas, commenttable_id: id, type: "edit-Comment", blog_id: detailData._id, comments: allInfoOfComments.comments }))
            }
            const { data } = await editComment(id, datas)
            if (data.success === 1) {
                getDataComments('reply-Comment', detailData._id, 1, allInfoOfComments.replyID)

                getDataComments('Comment', detailData._id, 1, "")
                if (allInfoOfComments.activeEditComment) {
                    dispatch({ type: ACTIVEEDITCOMMENT })
                }

                dispatch(deleteReplyCommentIDs(id))
                handleSetValueReplyComment('')


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
    const handleReactionComments = async (id, type, courseID) => {
        try {
            const datas = {
                type: type,
                courseID: courseID
            }
            const { data } = await createReactionComment(id, datas)
            if (data.success === 1) {
                if (data.data.commenttable_type === "Comment") {
                    const newComments = allInfoOfComments.comments.map((val) => {
                        if (val.commenttable_id === data.data.commenttable_id) {
                            val = data.data
                        }
                        return val
                    })
                    dispatch(setComments(newComments))
                } else {
                    const newComments = allInfoOfComments.replyComments.map((val) => {
                        if (val.commenttable_id === data.data.commenttable_id) {
                            val = data.data
                        }
                        return val
                    })
                    dispatch(setReplyComments(newComments))
                }

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
    //socket io comment
    // useEffect(() => {

    //     if (detailData._id) {
    //         console.log('vo', detailData._id)
    //         socket.current = io("http://localhost:8800")
    //         socket.current.emit('add-new-comment', detailData._id)
    //     }
    // }, [detailData._id])

    // useEffect(() => {
    //     console.log(allInfoOfComments.sendMessage)
    //     if (allInfoOfComments.sendMessage) {
    //         console.log('sendmss', allInfoOfComments.sendMessage)
    //         socket.current.emit("send-comment", allInfoOfComments.sendMessage)
    //     }
    // }, [allInfoOfComments.sendMessage])
    // useEffect(() => {
    //     if (detailData._id) {
    //         socket.current.on("recive-comment", datas => {
    //             console.log('rsms', datas)
    //             dispatch(setRecievMessage(datas))
    //         })

    //         dispatch(setSendMessage(null))
    //     }
    // }, [detailData._id])
    // useEffect(() => {
    //     if (detailData._id) {
    //         socket.current.on("respond-delete-comment", datas => {
    //             dispatch(setRecievMessage(datas))
    //         })
    //         dispatch(setDeleteMessage(null))
    //     }
    // }, [detailData._id])
    // useEffect(() => {
    //     if (allInfoOfComments.deleteMessage) {
    //         socket.current.emit("delete-comment", allInfoOfComments.deleteMessage)
    //     }
    // }, [allInfoOfComments.deleteMessage])
    // useEffect(() => {
    //     if (detailData._id && allInfoOfComments.sendMessage) {

    //     }
    //     if (detailData._id && allInfoOfComments.deleteMessage) {

    //     }
    // }, [detailData._id, allInfoOfComments.sendMessage, allInfoOfComments.deleteMessage])
    // useEffect(() => {
    //     if (allInfoOfComments.recieveMessage && allInfoOfComments.recieveMessage.blog_id === detailData._id && allInfoOfComments.recieveMessage.commenttable_type === 'Comment') {
    //         console.log(allInfoOfComments.recieveMessage.receivedComments)
    //         dispatch(setComments(allInfoOfComments.recieveMessage.receivedComments))
    //         dispatch(setRecievMessage(null))
    //     }
    //     if (allInfoOfComments.recieveMessage && allInfoOfComments.recieveMessage.blog_id === detailData._id && allInfoOfComments.recieveMessage.commenttable_type === 'reply-Comment') {
    //         const newComments = allInfoOfComments.comments.map((cm) => {
    //             if (cm.commenttable_id === allInfoOfComments.recieveMessage.datas.reply_id) {
    //                 cm.is_Comment = true
    //                 cm.comment_count += 1
    //             }
    //             return cm
    //         })
    //         console.log(newComments)
    //         console.log("rl", allInfoOfComments.recieveMessage)
    //         dispatch(setComments(newComments))
    //         dispatch(setReplyComments(allInfoOfComments.recieveMessage.receivedComments))
    //         dispatch(setRecievMessage(null))
    //     }
    //     if (allInfoOfComments.recieveMessage && allInfoOfComments.recieveMessage.blog_id === detailData._id && allInfoOfComments.recieveMessage.type === 'delete') {
    //         dispatch(setComments(allInfoOfComments.recieveMessage.newComments))
    //         dispatch(setRecievMessage(null))
    //     }
    // }, [allInfoOfComments.recieveMessage])
    //socket io comment
    useEffect(() => {
        if (slug) {
            socket.current = io(process.env.REACT_APP_SOCKET_URL)
            socket.current.emit('add-new-comment', detailData._id)
        }
        // eslint-disable-next-line
    }, [slug])

    useEffect(() => {
        console.log(allInfoOfComments.sendMessage)
        if (allInfoOfComments.sendMessage) {
            console.log('sendmss', allInfoOfComments.sendMessage)
            socket.current.emit("send-commentBlog", allInfoOfComments.sendMessage)
        }
    }, [allInfoOfComments.sendMessage])
    useEffect(() => {
        if (slug) {
            socket.current.on("recive-commentBlog", datas => {
                console.log('rsms', datas)
                dispatch(setRecievMessage(datas))
            })

            dispatch(setSendMessage(null))
        }
        // eslint-disable-next-line
    }, [slug])

    useEffect(() => {
        if (allInfoOfComments.deleteMessage) {
            socket.current.emit("delete-commentBlog", allInfoOfComments.deleteMessage)
        }
    }, [allInfoOfComments.deleteMessage])
    useEffect(() => {
        if (slug) {
            socket.current.on("respond-delete-commentBlog", datas => {
                dispatch(setRecievMessage(datas))
            })
            dispatch(setDeleteMessage(null))
        }
        // eslint-disable-next-line
    }, [slug])

    useEffect(() => {
        if (allInfoOfComments.editMessage) {
            socket.current.emit("update-commentBlog", allInfoOfComments.editMessage)
        }
    }, [allInfoOfComments.editMessage])
    useEffect(() => {
        if (slug) {
            socket.current.on("update-respond-commentBlog", datas => {
                dispatch(setRecievMessage(datas))
            })
            dispatch(setEditMessage(null))
        }
        // eslint-disable-next-line
    }, [slug])
    useEffect(() => {
        if (allInfoOfComments.recieveMessage && allInfoOfComments.recieveMessage.blog_id === detailData._id && allInfoOfComments.recieveMessage.commenttable_type === 'Comment') {
            console.log(allInfoOfComments.recieveMessage.receivedComments)
            dispatch(setComments(allInfoOfComments.recieveMessage.receivedComments))
            dispatch(setRecievMessage(null))
        }
        if (allInfoOfComments.recieveMessage && allInfoOfComments.recieveMessage.blog_id === detailData._id && allInfoOfComments.recieveMessage.commenttable_type === 'reply-Comment') {
            const newComments = allInfoOfComments.comments.map((cm) => {
                if (cm.commenttable_id === allInfoOfComments.recieveMessage.datas.reply_id) {
                    cm.is_Comment = true
                    cm.comment_count += 1
                }
                return cm
            })
            dispatch(setComments(newComments))
            dispatch(setReplyComments(allInfoOfComments.recieveMessage.receivedComments))
            dispatch(setRecievMessage(null))
        }
        if (allInfoOfComments.recieveMessage && allInfoOfComments.recieveMessage.blog_id === detailData._id && allInfoOfComments.recieveMessage.type === 'delete') {
            dispatch(setComments(allInfoOfComments.recieveMessage.newComments))
            dispatch(setRecievMessage(null))
        }
        if (allInfoOfComments.recieveMessage && allInfoOfComments.recieveMessage.blog_id === detailData._id && allInfoOfComments.recieveMessage.type === 'delete-children') {
            const newComments = allInfoOfComments.comments.map((cm) => {
                if (cm.commenttable_id === allInfoOfComments.recieveMessage.parentID) {
                    if (cm.comment_count <= 0) {
                        cm.is_Comment = false
                    } else {
                        cm.comment_count -= 1
                    }
                }
                return cm
            })
            dispatch(setComments(newComments))
            dispatch(setReplyComments(allInfoOfComments.recieveMessage.newComments))
            dispatch(setRecievMessage(null))
        }
        if (allInfoOfComments.recieveMessage && allInfoOfComments.recieveMessage.blog_id === detailData._id && allInfoOfComments.recieveMessage.type === 'edit-Comment') {
            dispatch(setComments(allInfoOfComments.recieveMessage.comments))
            dispatch(setRecievMessage(null))
        }
        if (allInfoOfComments.recieveMessage && allInfoOfComments.recieveMessage.blog_id === detailData._id && allInfoOfComments.recieveMessage.type === 'edit-replyComment') {
            dispatch(setReplyComments(allInfoOfComments.recieveMessage.comments))
            dispatch(setRecievMessage(null))
        }
        // eslint-disable-next-line
    }, [allInfoOfComments.recieveMessage])

    return (context.commentBlogs && <> <div>
        <div className={cx('wrapper', context.addstyle ? ("") : ("closing"))}>
            <div className={cx('container')}>
                <div className={cx('closebnt')} onClick={context.handleAddStyle}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>
                <div className={cx('body')}>
                    <div className={cx('detailRow')}>
                        {allInfoOfComments.totalComments !== 0 ?

                            <div className={cx('contentHeading')}>
                                <div>
                                    <h4>{allInfoOfComments.totalComments} Hỏi đáp</h4>
                                    <p className={cx('help')}>(Nếu thấy bình luận spam, các bạn bấm report giúp admin)</p>

                                </div>
                            </div> : ""
                        }
                        <div className={cx('commentWrapper')}>
                            <div className={cx('avatarWrapper')}>
                                <div className={cx('feedbackAvatar')}>
                                    {/* <img src={user?.avatar ? user?.avatar : 'https://bootdey.com/img/Content/avatar/avatar7.png'} className={cx('myAvatar')} alt={user?.Username} /> */}
                                    {user?.provider ? <img className={cx('myAvatar')} src={user?.avatar} alt={user?.Username} /> :
                                        user?.avatar ? (<img src={process.env.REACT_APP_BACKEND_URL + '/user/' + user?.nickname + '/' + user?.avatar} className={cx('myAvatar')} alt={user?.Username} />) : (

                                            <img className={cx('myAvatar')} src='https://bootdey.com/img/Content/avatar/avatar7.png' alt={user?.Username} />
                                        )}
                                </div>
                            </div>
                            <div className={cx('commentContent')}>
                                {allInfoOfComments.activeComment ? (<>
                                    <EditorComments handleSetValueComment={handleSetValueComment} />
                                    <div className={cx('actionwrapper')}>
                                        <Button onClick={() => {
                                            dispatch({ type: ACTIVECOMMENT })
                                            dispatch(setValueComment(''))
                                        }} normal>Hủy</Button>
                                        <Button onClick={handleCreateComment} primary disable={isEmpty(allInfoOfComments.valueComment)} disabled={isEmpty(allInfoOfComments.valueComment)}>Bình luận</Button>
                                    </div>
                                </>) : (
                                    <div onClick={() => dispatch({ type: ACTIVECOMMENT })} className={cx('placeholder')}>
                                        <span>Bạn có thắc mắc gì trong bài này?</span>
                                    </div>
                                )}

                            </div>
                        </div>
                        {allInfoOfComments.comments.length <= 0 ? <div className={cx('no_comments')}> <img src={NoCM} alt='nocomments' />
                            <p>Chưa có bất kỳ bình luận nào</p></div> :
                            allInfoOfComments.comments?.map((com) => <>
                                <div key={com.commenttable_id} className={cx('detailComment')}>
                                    <div className={cx('avatarcomment')}>
                                        <Link to={'/@/"' + com.user?.nickname + '"'}>
                                            <div className={cx('avatarwrapperComment')}>
                                                <div className={cx('feedbackAvatar')}>
                                                    {com.user?.provider ? <img className={cx('myAvatar')} src={com.user?.avatar} alt={com.user?.Username} /> :
                                                        com.user?.avatar ? (<img src={process.env.REACT_APP_BACKEND_URL + '/user/' + com.user?.nickname + '/' + com.user?.avatar} className={cx('myAvatar')} alt={com.user?.Username} />) : (

                                                            <img className={cx('myAvatar')} src='https://bootdey.com/img/Content/avatar/avatar7.png' alt={com.user?.Username} />
                                                        )}
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={cx('commentBody')}>
                                        <div className={cx('commentInner')}>
                                            <div className={cx('commentWrapperauthor')}>
                                                <div className={cx('commentContent')}>
                                                    <div className={cx('commentContentHeading')}>
                                                        <Link to={'/@/"' + com.user?.nickname + '"'}>
                                                            <span className={cx('commentAuthor')}>{com.user?.Username}</span>
                                                        </Link>
                                                    </div>
                                                    <div className={cx('commentText')}>
                                                        <div className={cx('MarkdownParser-wrapper')}>
                                                            {HTMLReactParser(com.comment)}
                                                        </div>
                                                    </div>
                                                    {com.reactions_count > 0 &&
                                                        <div className={cx('countReaction')}>
                                                            <div style={{
                                                                display: "flex",
                                                                cursor: " pointer",
                                                                color: "rgb(54, 88, 153)",
                                                                fontFamily: "\"San Francisco\", -apple-system, BlinkMacSystemFont, \".SFNSText-Regular\", sans-serif",
                                                                fontSize: "12px",
                                                                fontWeight: "500"
                                                            }}>
                                                                {reactDataEmoijs.map((val) =>
                                                                    com.reaction_summary[val.id] &&
                                                                    <div style={{
                                                                        width: "18px",
                                                                        height: "18px",
                                                                        backgroundSize: "100% 100%",
                                                                        borderRadius: "8px",
                                                                        boxShadow: " rgb(250, 250, 250) 0px 0px 0px 2px",
                                                                        position: "relative",
                                                                        backgroundImage: "url(" + val.url + ")",
                                                                        zIndex: "1"
                                                                    }}></div>)}
                                                            </div>
                                                            <div className={cx('reactionNum')}>{com.reactions_count}</div>
                                                        </div>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className={cx('commentTime')}>
                                            <div className={cx('creatAt')}>
                                                <div className={cx('createdAtLeft')}>
                                                    <Tippy
                                                        interactive
                                                        // popperOptions={}
                                                        onClickOutside={() => {
                                                            dispatch({ type: SHOWREACTEMOJ, payload: false })
                                                            dispatch(setReactEmojID(""))
                                                        }}
                                                        visible={allInfoOfComments.showReactEmoj && com._id === allInfoOfComments.setReactEmojID}
                                                        placement='top'
                                                        render={attrs => (
                                                            <div >
                                                                <div style={{
                                                                    backgroundColor: "rgb(255, 255, 255)",
                                                                    borderRadius: "50p",
                                                                    padding: "2px",
                                                                    boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.15) 0px 1px 2px",
                                                                    display: "flex"
                                                                }}>
                                                                    {reactDataEmoijs.map((val) =>
                                                                        <div key={val.id} className={cx('parent-emj')} style={{ width: "48px" }} onClick={() => handleReactionComments(com.commenttable_id, val.id, detailData._id)}>
                                                                            <span>
                                                                                <div>
                                                                                    <div style={{
                                                                                        padding: "5px",
                                                                                        position: "relative"
                                                                                    }}>
                                                                                        <div className={cx('name-react')} style={{
                                                                                            position: "absolute",
                                                                                            top: "-22px",
                                                                                            background: "rgba(0, 0, 0, 0.8)",
                                                                                            borderRadius: "14px",
                                                                                            color: "rgb(255, 255, 255)",
                                                                                            fontSize: " 11px",
                                                                                            padding: "4px 8px",
                                                                                            fontWeight: "600",
                                                                                            textTransform: "capitalize",
                                                                                            left: "50%",
                                                                                            transform: "translateX(-50%)",
                                                                                            transition: "transform 200ms cubic-bezier(0.23, 1, 0.32, 1) 0s",
                                                                                            whiteSpace: " nowrap"
                                                                                        }}>{val.name}</div>
                                                                                        <div className={cx('avatar-react')} style={{
                                                                                            paddingBottom: " 100%",
                                                                                            backgroundSize: "100% 100%",
                                                                                            transformOrigin: " center bottom",
                                                                                            cursor: "pointer",
                                                                                            transition: "transform 200ms cubic-bezier(0.23, 1, 0.32, 1) 0s",

                                                                                            backgroundImage: "url(" + val.url + ")"
                                                                                        }}></div>
                                                                                    </div>
                                                                                </div>
                                                                            </span>
                                                                        </div>)}
                                                                </div>

                                                            </div>
                                                        )}>
                                                        {com.reactionText ?
                                                            <button className={cx('iconWrapper')} onMouseOver={() => {
                                                                dispatch({ type: SHOWREACTEMOJ, payload: true })
                                                                dispatch(setReactEmojID(com._id))
                                                            }}
                                                                onClick={() => handleReactionComments(com.commenttable_id, allInfoOfComments.textReaction[com.reactionText], detailData._id)}
                                                            >
                                                                <span className={cx('likeComment', 'activeReaction')}>{com.reactionText}</span>
                                                            </button> :
                                                            <button className={cx('iconWrapper')} onMouseOver={() => {
                                                                dispatch({ type: SHOWREACTEMOJ, payload: true })
                                                                dispatch(setReactEmojID(com._id))
                                                            }}
                                                                onClick={() => handleReactionComments(com.commenttable_id, "like", detailData._id)}
                                                            >
                                                                <span className={cx('likeComment')}>Thích</span>
                                                            </button>}
                                                    </Tippy>
                                                    .
                                                    <span onClick={() => {
                                                        dispatch({ type: ACTIVEREPLY })
                                                        if (allInfoOfComments.activeEditComment) {

                                                            dispatch({ type: ACTIVEEDITCOMMENT })
                                                        }
                                                        dispatch(setReplyCommentID(com.commenttable_id))
                                                        dispatch(setReplyCommentIDs(com.commenttable_id))
                                                    }} className={cx('repleComment')}>Trả lời</span>

                                                </div>
                                                <div className={cx('createdAtRight')}>
                                                    <span className={cx('createAtDotRight')}>.</span>
                                                    <span className={cx('time')}>
                                                        <TimeAgo
                                                            datetime={com.createdAt}
                                                            locale='vi'
                                                        /></span>
                                                    <span className={cx('moreBntWrapper')}>
                                                        <span className={cx('createAtDotRight')}>.</span>
                                                        <Tippy
                                                            interactive
                                                            visible={allInfoOfComments.showOption && com.commenttable_id === allInfoOfComments.showOptionID} onClickOutside={() => dispatch({ type: SHOWOPTION, payload: false })}
                                                            placement='bottom-end'
                                                            render={attrs => (
                                                                <div tabIndex="-1" {...attrs}>
                                                                    <ul className={cx('tipy-option')}>
                                                                        {user._id === com.user._id ? <>
                                                                            <li onClick={() => {
                                                                                dispatch({ type: ACTIVEREPLY })
                                                                                if (!allInfoOfComments.activeEditComment) {

                                                                                    dispatch({ type: ACTIVEEDITCOMMENT })
                                                                                }
                                                                                dispatch(setReplyCommentID(com.commenttable_id))
                                                                                dispatch(setReplyCommentIDs(com.commenttable_id))
                                                                                dispatch({ type: SHOWOPTION, payload: false })
                                                                                handleSetValueReplyComment(com.comment)
                                                                            }}>
                                                                                <FontAwesomeIcon icon={faEdit} />
                                                                                <span>Chỉnh sửa</span>

                                                                            </li>

                                                                            <li onClick={() => hanldeDeleteCommentParent(com.commenttable_id)}>

                                                                                <FontAwesomeIcon icon={faTrash} />
                                                                                <span>Xóa</span>

                                                                            </li></> : ""}
                                                                        <li>
                                                                            <FontAwesomeIcon icon={faFlag} />
                                                                            <span>Báo cáo</span>
                                                                        </li>
                                                                    </ul>

                                                                </div>
                                                            )}>
                                                            <button onClick={() => {
                                                                dispatch({ type: SHOWOPTION, payload: true })
                                                                dispatch(setShowOptionID(com.commenttable_id))
                                                            }} className={cx('moreBnt')}><FontAwesomeIcon icon={faEllipsis} /></button>

                                                        </Tippy>


                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        {allInfoOfComments.activeReply && allInfoOfComments.replyCommentIDs?.includes(com.commenttable_id) &&
                                            <div className={cx('reply_BoxComment')}>
                                                <div className={cx('replyContent')}>
                                                    <div className={cx('avatarcomment')}>
                                                        <div className={cx('avatarwrapperComment')}>
                                                            <div className={cx('feedbackAvatar')}>
                                                                {com.user?.provider ? <img className={cx('myAvatar')} src={com.user?.avatar} alt={com.user?.Username} /> :
                                                                    com.user?.avatar ? (<img src={process.env.REACT_APP_BACKEND_URL + '/user/' + com.user?.nickname + '/' + com.user?.avatar} className={cx('myAvatar')} alt={com.user?.Username} />) : (

                                                                        <img className={cx('myAvatar')} src='https://bootdey.com/img/Content/avatar/avatar7.png' alt={com.user?.Username} />
                                                                    )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {allInfoOfComments.activeEditComment ? <EditorReplyComments handleSetValueReplyComment={handleSetValueReplyComment} valueOfReplyComment={allInfoOfComments.valueReplyComment} />
                                                        :
                                                        <EditorReplyComments handleSetValueReplyComment={handleSetValueReplyComment} valueOfReplyComment={com.user?.Username === user.Username ? "" : '@' + com.user?.Username} />}
                                                </div>
                                                <div className={cx('actionwrapper_reply')}>
                                                    <Button normal onClick={() => {
                                                        dispatch(deleteReplyCommentIDs(com.commenttable_id))
                                                        handleSetValueReplyComment('')
                                                        if (allInfoOfComments.activeEditComment) {

                                                            dispatch({ type: ACTIVEEDITCOMMENT })
                                                        }

                                                    }}>Hủy</Button>
                                                    {allInfoOfComments.activeEditComment ? <Button primary onClick={() => handleEditComment(com.commenttable_id, com.commenttable_type)} disable={isEmpty(allInfoOfComments.valueReplyComment)} disabled={isEmpty(allInfoOfComments.valueReplyComment)} >Lưu lại</Button>
                                                        :
                                                        <Button primary onClick={() => handleCreateReplyComment(com.commenttable_id)} disable={isEmpty(allInfoOfComments.valueReplyComment)} disabled={isEmpty(allInfoOfComments.valueReplyComment)} >Trả lời</Button>}
                                                </div>
                                            </div>}

                                        {com?.comment_count !== 0 && com.comment_count !== undefined ?
                                            allInfoOfComments.watchReply && allInfoOfComments.replyIDs?.includes(com.commenttable_id) ?
                                                <div onClick={() => {
                                                    dispatch(deleteReplyIDs(com.commenttable_id))
                                                    dispatch(setConvertReplyIDS(com.commenttable_id))
                                                }} className={cx('watch-reply')}>{"Ẩn câu trả lời"}
                                                    <FontAwesomeIcon style={{ marginLeft: '5px' }} icon={allInfoOfComments.watchReply && allInfoOfComments.replyIDs?.includes(com.commenttable_id) ? faAngleUp : faAngleDown} />
                                                </div> : <div onClick={() => {
                                                    dispatch({ type: WATCHREPLY })
                                                    dispatch(setReplyID(com.commenttable_id))
                                                    handleGetReplyDataOneTime(com.commenttable_id)
                                                    dispatch(setReplyIDS([...allInfoOfComments.replyIDs, com.commenttable_id]))
                                                }} className={cx('watch-reply')}>{"Xem " + com.comment_count + " câu trả lời"}
                                                    <FontAwesomeIcon style={{ marginLeft: '5px' }} icon={allInfoOfComments.watchReply && allInfoOfComments.replyIDs?.includes(com.commenttable_id) ? faAngleUp : faAngleDown} />
                                                </div> : ""}
                                    </div>


                                </div>
                                {com.comment_count !== 0 && allInfoOfComments.watchReply && allInfoOfComments.replyComments.map((rep) =>
                                    allInfoOfComments.replyIDs.includes(com.commenttable_id) && rep.reply_id === com.commenttable_id && <div key={rep._id} className={cx('reply')}>
                                        <div className={cx('detailComment', 'relyComment')} style={{
                                            display: " flex",
                                            flexDirection: "column"
                                        }}>
                                            <div style={{
                                                display: " flex",

                                            }}>
                                                <div className={cx('avatarcomment')}>
                                                    <Link to={'/@/"' + rep.user?.nickname + '"'}>
                                                        <div className={cx('avatarwrapperComment')}>
                                                            <div className={cx('feedbackAvatar')}>
                                                                {rep.user?.provider ? <img className={cx('myAvatar')} src={rep.user?.avatar} alt={rep.user?.Username} /> :
                                                                    rep.user?.avatar ? (<img src={process.env.REACT_APP_BACKEND_URL + '/user/' + rep.user?.nickname + '/' + rep.user?.avatar} className={cx('myAvatar')} alt={rep.user?.Username} />) : (

                                                                        <img className={cx('myAvatar')} src='https://bootdey.com/img/Content/avatar/avatar7.png' alt={rep.user?.Username} />
                                                                    )}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>

                                                <div className={cx('commentBody')}>
                                                    <div className={cx('commentInner')}>
                                                        <div className={cx('commentWrapperauthor')}>
                                                            <div className={cx('commentContent')}>
                                                                <div className={cx('commentContentHeading')}>
                                                                    <Link to={'/@/"' + rep.user?.nickname + '"'}>
                                                                        <span className={cx('commentAuthor')}>{rep.user?.Username}</span>
                                                                    </Link>
                                                                </div>
                                                                <div className={cx('commentText')}>
                                                                    <div className={cx('MarkdownParser-wrapper')}>
                                                                        {HTMLReactParser(rep.comment)}
                                                                    </div>
                                                                </div>
                                                                {rep.reactions_count > 0 &&
                                                                    <div className={cx('countReaction')}>
                                                                        <div style={{
                                                                            display: "flex",
                                                                            cursor: " pointer",
                                                                            color: "rgb(54, 88, 153)",
                                                                            fontFamily: "\"San Francisco\", -apple-system, BlinkMacSystemFont, \".SFNSText-Regular\", sans-serif",
                                                                            fontSize: "12px",
                                                                            fontWeight: "500"
                                                                        }}>
                                                                            {reactDataEmoijs.map((val) =>
                                                                                rep.reaction_summary[val.id] &&
                                                                                <div style={{
                                                                                    width: "18px",
                                                                                    height: "18px",
                                                                                    backgroundSize: "100% 100%",
                                                                                    borderRadius: "8px",
                                                                                    boxShadow: " rgb(250, 250, 250) 0px 0px 0px 2px",
                                                                                    position: "relative",
                                                                                    backgroundImage: "url(" + val.url + ")",
                                                                                    zIndex: "1"
                                                                                }}></div>)}
                                                                        </div>
                                                                        <div className={cx('reactionNum')}>{rep.reactions_count}</div>
                                                                    </div>}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className={cx('commentTime')}>
                                                        <div className={cx('creatAt')}>
                                                            <div className={cx('createdAtLeft')}>
                                                                <Tippy
                                                                    interactive
                                                                    // popperOptions={}
                                                                    onClickOutside={() => {
                                                                        dispatch({ type: SHOWREACTEMOJ, payload: false })
                                                                        dispatch(setReactEmojID(""))
                                                                    }}
                                                                    visible={allInfoOfComments.showReactEmoj && rep._id === allInfoOfComments.setReactEmojID}
                                                                    placement='top'
                                                                    render={attrs => (
                                                                        <div >
                                                                            <div style={{
                                                                                backgroundColor: "rgb(255, 255, 255)",
                                                                                borderRadius: "50p",
                                                                                padding: "2px",
                                                                                boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.15) 0px 1px 2px",
                                                                                display: "flex"
                                                                            }}>
                                                                                {reactDataEmoijs.map((val) =>
                                                                                    <div key={val.id} className={cx('parent-emj')} style={{ width: "48px" }} onClick={() => handleReactionComments(rep.commenttable_id, val.id, detailData._id)}>
                                                                                        <span>
                                                                                            <div>
                                                                                                <div style={{
                                                                                                    padding: "5px",
                                                                                                    position: "relative"
                                                                                                }}>
                                                                                                    <div className={cx('name-react')} style={{
                                                                                                        position: "absolute",
                                                                                                        top: "-22px",
                                                                                                        background: "rgba(0, 0, 0, 0.8)",
                                                                                                        borderRadius: "14px",
                                                                                                        color: "rgb(255, 255, 255)",
                                                                                                        fontSize: " 11px",
                                                                                                        padding: "4px 8px",
                                                                                                        fontWeight: "600",
                                                                                                        textTransform: "capitalize",
                                                                                                        left: "50%",
                                                                                                        transform: "translateX(-50%)",
                                                                                                        transition: "transform 200ms cubic-bezier(0.23, 1, 0.32, 1) 0s",
                                                                                                        whiteSpace: " nowrap"
                                                                                                    }}>{val.name}</div>
                                                                                                    <div className={cx('avatar-react')} style={{
                                                                                                        paddingBottom: " 100%",
                                                                                                        backgroundSize: "100% 100%",
                                                                                                        transformOrigin: " center bottom",
                                                                                                        cursor: "pointer",
                                                                                                        transition: "transform 200ms cubic-bezier(0.23, 1, 0.32, 1) 0s",

                                                                                                        backgroundImage: "url(" + val.url + ")"
                                                                                                    }}></div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </span>
                                                                                    </div>)}
                                                                            </div>

                                                                        </div>
                                                                    )}>
                                                                    {rep.reactionText ?
                                                                        <button className={cx('iconWrapper')} onMouseOver={() => {
                                                                            dispatch({ type: SHOWREACTEMOJ, payload: true })
                                                                            dispatch(setReactEmojID(rep._id))
                                                                        }}
                                                                            onClick={() => handleReactionComments(rep.commenttable_id, allInfoOfComments.textReaction[rep.reactionText], detailData._id)}
                                                                        >
                                                                            <span className={cx('likeComment', 'activeReaction')}>{rep.reactionText}</span>
                                                                        </button> :
                                                                        <button className={cx('iconWrapper')} onMouseOver={() => {
                                                                            dispatch({ type: SHOWREACTEMOJ, payload: true })
                                                                            dispatch(setReactEmojID(rep._id))
                                                                        }}
                                                                            onClick={() => handleReactionComments(rep.commenttable_id, "like", detailData._id)}
                                                                        >
                                                                            <span className={cx('likeComment')}>Thích</span>
                                                                        </button>}
                                                                </Tippy>
                                                                .
                                                                <span onClick={() => {
                                                                    dispatch({ type: ACTIVEREPLY })
                                                                    if (allInfoOfComments.activeEditComment) {

                                                                        dispatch({ type: ACTIVEEDITCOMMENT })
                                                                    }
                                                                    dispatch(setReplyCommentID(rep._id))
                                                                    dispatch(setReplyCommentIDs(rep._id))
                                                                }} className={cx('repleComment')}>Trả lời</span>

                                                            </div>
                                                            <div className={cx('createdAtRight')}>
                                                                <span className={cx('createAtDotRight')}>.</span>
                                                                <span className={cx('time')}>
                                                                    <TimeAgo
                                                                        datetime={rep.createdAt}
                                                                        locale='vi'
                                                                    /></span>
                                                                <span className={cx('moreBntWrapper')}>
                                                                    <span className={cx('createAtDotRight')}>.</span>
                                                                    <Tippy
                                                                        interactive
                                                                        visible={allInfoOfComments.showOption && rep._id === allInfoOfComments.showOptionID}
                                                                        onClickOutside={() => {
                                                                            dispatch({ type: SHOWOPTION, payload: false })
                                                                            dispatch(setShowOptionID(''))
                                                                        }}
                                                                        placement='bottom-end'
                                                                        render={attrs => (
                                                                            <div tabIndex="-1" {...attrs}>
                                                                                <ul className={cx('tipy-option')}>
                                                                                    {user._id === rep.user._id ? <>
                                                                                        <li onClick={() => {
                                                                                            dispatch({ type: ACTIVEREPLY })
                                                                                            if (!allInfoOfComments.activeEditComment) {

                                                                                                dispatch({ type: ACTIVEEDITCOMMENT })
                                                                                            }
                                                                                            dispatch(setReplyCommentID(rep._id))
                                                                                            dispatch(setReplyCommentIDs(rep._id))
                                                                                            dispatch({ type: SHOWOPTION, payload: false })
                                                                                            handleSetValueReplyComment(rep.comment)
                                                                                        }}>
                                                                                            <FontAwesomeIcon icon={faEdit} />
                                                                                            <span>Chỉnh sửa</span>

                                                                                        </li>

                                                                                        <li onClick={() => hanldeDeleteCommentChildren(com.commenttable_id, rep.commenttable_id)}>

                                                                                            <FontAwesomeIcon icon={faTrash} />
                                                                                            <span>Xóa</span>

                                                                                        </li> </> : ""}
                                                                                    <li>
                                                                                        <FontAwesomeIcon icon={faFlag} />
                                                                                        <span>Báo cáo</span>
                                                                                    </li>
                                                                                </ul>

                                                                            </div>
                                                                        )}>
                                                                        <button onClick={() => {
                                                                            dispatch({ type: SHOWOPTION, payload: true })
                                                                            dispatch(setShowOptionID(rep._id))
                                                                        }} className={cx('moreBnt')}><FontAwesomeIcon icon={faEllipsis} /></button>

                                                                    </Tippy>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {allInfoOfComments.activeReply && allInfoOfComments.replyCommentIDs?.includes(rep._id) &&
                                                <div className={cx('reply_BoxComment')}>
                                                    <div className={cx('replyContent')}>
                                                        <div className={cx('avatarcomment')}>
                                                            <div className={cx('avatarwrapperComment')}>
                                                                <div className={cx('feedbackAvatar')}>
                                                                    {rep.user?.provider ? <img className={cx('myAvatar')} src={rep.user?.avatar} alt={rep.user?.Username} /> :
                                                                        rep.user?.avatar ? (<img src={process.env.REACT_APP_BACKEND_URL + '/user/' + rep.user?.nickname + '/' + rep.user?.avatar} className={cx('myAvatar')} alt={rep.user?.Username} />) : (

                                                                            <img className={cx('myAvatar')} src='https://bootdey.com/img/Content/avatar/avatar7.png' alt={rep.user?.Username} />
                                                                        )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {allInfoOfComments.activeEditComment ? <EditorReplyComments handleSetValueReplyComment={handleSetValueReplyComment} valueOfReplyComment={allInfoOfComments.valueReplyComment} />
                                                            :
                                                            <EditorReplyComments handleSetValueReplyComment={handleSetValueReplyComment} valueOfReplyComment={rep.user?.Username === user.Username ? "" : '@' + rep.user?.Username} />}
                                                    </div>
                                                    <div className={cx('actionwrapper_reply')}>
                                                        <Button normal onClick={() => {
                                                            dispatch(deleteReplyCommentIDs(rep._id))
                                                            handleSetValueReplyComment('')
                                                            if (allInfoOfComments.activeEditComment) {

                                                                dispatch({ type: ACTIVEEDITCOMMENT })
                                                            }

                                                        }}>Hủy</Button>
                                                        {allInfoOfComments.activeEditComment ? <Button primary onClick={() => handleEditComment(rep.commenttable_id, rep.commenttable_type)} disable={isEmpty(allInfoOfComments.valueReplyComment)} disabled={isEmpty(allInfoOfComments.valueReplyComment)} >Lưu lại</Button>
                                                            :
                                                            <Button primary onClick={() => handleCreateReplyComment(com.commenttable_id)} disable={isEmpty(allInfoOfComments.valueReplyComment)} disabled={isEmpty(allInfoOfComments.valueReplyComment)} >Trả lời</Button>}
                                                    </div>
                                                </div>}

                                        </div></div>)}</>
                            )
                        }

                    </div>
                </div>
            </div>
            <div className={cx('the-rest')} onClick={context.handleAddStyle}></div>
        </div>
    </div>
        <ToastContainer />
    </>)
}

export default memo(CommentBlog)