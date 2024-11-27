
import { useState } from "react";
import Context from "./Context";

function Provider({ children }) {
    const [show, setShow] = useState(false)
    const [comments, setComments] = useState(false)
    const [commentBlogs, setCommentBlogs] = useState(false)
    const [stract, setStract] = useState(true)
    const [barmenu, setBarmenu] = useState(false)
    const [addstyle, setAddStyle] = useState(false)
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState(false);
    const [list, setList] = useState(true);
    const [showChatBox, setShowChatBox] = useState(false)
    const [newBlog, setNewBlog] = useState(false)
    const [messageWatch, setMessageWatch] = useState(false)
    const [getBlog, setGetBlog] = useState('')
    const [saveInfoBlog, setSaveInfoBlog] = useState({})

    const [comment, setComment] = useState('')


    const handleShow = () => {
        setShow(!show)
    }
    const handleComment = () => {

        setComments(true)
        setAddStyle(!addstyle)
    }
    const handleCommentBlog = () => {

        setCommentBlogs(true)
        setAddStyle(!addstyle)
    }
    const handleStract = () => {
        setStract(!stract)
    }
    const handleBarMenu = () => {
        setBarmenu(!barmenu)
    }
    const handleAddStyle = () => {
        setAddStyle(!addstyle)
        setComments(false)
        setCommentBlogs(false)
    }
    const handleAvater = () => {
        setAvatar(!avatar)
    }
    const handleList = () => {
        setList(!list)
    }
    const handleNewlog = () => {
        setNewBlog(!newBlog)
    }


    const value = {
        show,
        comments,
        commentBlogs,
        stract,
        barmenu,
        addstyle,
        loading,
        avatar,
        list,
        showChatBox,
        newBlog,
        messageWatch,
        getBlog,
        comment,
        saveInfoBlog,
        setNewBlog,
        setShowChatBox,
        setShow,
        setLoading,
        handleShow,
        handleComment,
        handleStract,
        handleBarMenu,
        handleAddStyle,
        handleAvater,
        handleList,
        handleNewlog,
        setMessageWatch,
        setGetBlog,
        setBarmenu,
        setComment,
        setSaveInfoBlog,
        handleCommentBlog

    }
    return (<Context.Provider value={value}>
        {children}
    </Context.Provider>)

}
export default Provider