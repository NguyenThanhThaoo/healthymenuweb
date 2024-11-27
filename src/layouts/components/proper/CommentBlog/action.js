import {
    SET_COMMENTS,
    SET_REPLYCOMMENTS,
    SET_REPLYIDS,
    SET_CONVERTREPLYIDS,
    SET_REPLYID,
    DELETE_REPLYIDS,
    SET_REPLYCOMMENTID,
    SET_REPLYCOMMENTIDS,
    DELETE_REPLYCOMMENTIDS,
    SET_TOTALCOMMENTS,
    SET_VALUECOMMENT,
    SET_VALUEREPLYCOMMENT,
    SET_SHOWOPTIONID,
    SET_SENDMESSAGE,
    SET_RECIEVEMESSAGE,
    SET_DELETEMESSAGE,
    SET_EDITMESSAGE,
    SET_SHOWREACTEMOJID
} from './constance'

export const setComments = (payload) => {
    return {
        type: SET_COMMENTS,
        payload
    }
}
export const setReplyComments = (payload) => {
    return {
        type: SET_REPLYCOMMENTS,
        payload
    }
}
export const setReplyIDS = (payload) => {
    return {
        type: SET_REPLYIDS,
        payload
    }
}
export const setConvertReplyIDS = (payload) => {
    return {
        type: SET_CONVERTREPLYIDS,
        payload
    }
}
export const setReplyID = (payload) => {
    return {
        type: SET_REPLYID,
        payload
    }
}
export const deleteReplyIDs = (payload) => {
    return {
        type: DELETE_REPLYIDS,
        payload
    }
}
export const setReplyCommentID = (payload) => {
    return {
        type: SET_REPLYCOMMENTID,
        payload
    }
}
export const setReplyCommentIDs = (payload) => {
    return {
        type: SET_REPLYCOMMENTIDS,
        payload
    }
}
export const deleteReplyCommentIDs = (payload) => {
    return {
        type: DELETE_REPLYCOMMENTIDS,
        payload
    }
}
export const setTotalComments = (payload) => {
    return {
        type: SET_TOTALCOMMENTS,
        payload
    }
}
export const setValueComment = (payload) => {
    return {
        type: SET_VALUECOMMENT,
        payload
    }
}
export const setValueReplyComment = (payload) => {
    return {
        type: SET_VALUEREPLYCOMMENT,
        payload
    }
}
export const setShowOptionID = (payload) => {
    return {
        type: SET_SHOWOPTIONID,
        payload
    }
}
export const setSendMessage = (payload) => {
    return {
        type: SET_SENDMESSAGE,
        payload
    }
}
export const setDeleteMessage = (payload) => {
    return {
        type: SET_DELETEMESSAGE,
        payload
    }
}
export const setEditMessage = (payload) => {
    return {
        type: SET_EDITMESSAGE,
        payload
    }
}
export const setRecievMessage = (payload) => {
    return {
        type: SET_RECIEVEMESSAGE,
        payload
    }
}
export const setReactEmojID = (payload) => {
    return {
        type: SET_SHOWREACTEMOJID,
        payload
    }
}
