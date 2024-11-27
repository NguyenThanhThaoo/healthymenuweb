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
    WATCHREPLY,
    ACTIVECOMMENT,
    ACTIVEEDITCOMMENT,
    ACTIVEREPLY,
    SHOWOPTION,
    SET_SENDMESSAGE,
    SET_RECIEVEMESSAGE,
    SET_DELETEMESSAGE,
    SET_EDITMESSAGE,
    SHOWREACTEMOJ,
    SET_SHOWREACTEMOJID
} from './constance'


//intial 
export const initalState = {
    comments: [],
    replyComments: [],
    totalComments: 0,
    replyIDs: [],
    convertReplyIDs: [],
    replyID: '',
    replyCommentID: '',
    replyCommentIDs: [],
    valueComment: '',
    valueReplyComment: '',
    showOptionID: '',
    setReactEmojID: '',
    textReaction: {
        "Thích": "like",
        "Yêu thích": "love",
        "Buồn": "sad",
        "Phẫn nộ": "anger",
        "Wow": "Wow",
        "Hahha": "laugh",
        "Thương thương": "crush"
    },
    sendMessage: null,
    recieveMessage: null,
    deleteMessage: null,
    editMessage: null,
    showReactEmoj: false,
    activeComment: false,
    activeEditComment: false,
    activeReply: false,
    watchReply: true,
    showOption: false
}
//reducer
const reducer = (state, action) => {
    switch (action.type) {
        case SET_COMMENTS:
            return { ...state, comments: [...action.payload] }
        case SET_REPLYCOMMENTS:
            return { ...state, replyComments: [...action.payload] }
        case SET_REPLYIDS:
            return { ...state, replyIDs: [...action.payload] }
        case SET_CONVERTREPLYIDS:
            if (state.convertReplyIDs.includes(action.payload)) {
                return { ...state }
            }
            return { ...state, convertReplyIDs: [...state.convertReplyIDs, action.payload] }

        case SET_REPLYCOMMENTIDS:
            if (state.replyCommentIDs.includes(action.payload)) {
                return { ...state }
            }
            return { ...state, replyCommentIDs: [...state.replyCommentIDs, action.payload] }
        case DELETE_REPLYCOMMENTIDS:

            const newArrayIds = [...state.replyCommentIDs]
            const index = newArrayIds.indexOf(action.payload)
            newArrayIds.splice(index, 1)
            return { ...state, replyCommentIDs: [...newArrayIds] }
        case DELETE_REPLYIDS:
            const newRelyIds = [...state.replyIDs]
            const indexRely = newRelyIds.indexOf(action.payload)
            newRelyIds.splice(indexRely, 1)
            return { ...state, replyIDs: [...newRelyIds] }
        case SET_REPLYID:
            return { ...state, replyID: action.payload }
        case SET_REPLYCOMMENTID:
            return { ...state, replyCommentID: action.payload }
        case SET_TOTALCOMMENTS:
            return { ...state, totalComments: action.payload }
        case SET_VALUECOMMENT:
            return { ...state, valueComment: action.payload }
        case SET_VALUEREPLYCOMMENT:
            return { ...state, valueReplyComment: action.payload }
        case SET_SENDMESSAGE:
            return { ...state, sendMessage: action.payload }
        case SET_DELETEMESSAGE:
            return { ...state, deleteMessage: action.payload }
        case SET_EDITMESSAGE:
            return { ...state, editMessage: action.payload }
        case SET_RECIEVEMESSAGE:
            return { ...state, recieveMessage: action.payload }
        case WATCHREPLY:
            return { ...state, watchReply: true }
        case ACTIVECOMMENT:
            return { ...state, activeComment: !state.activeComment }
        case ACTIVEEDITCOMMENT:
            return { ...state, activeEditComment: !state.activeEditComment }
        case ACTIVEREPLY:
            return { ...state, activeReply: true }
        case SHOWOPTION:
            return { ...state, showOption: action.payload }
        case SHOWREACTEMOJ:
            return { ...state, showReactEmoj: action.payload }
        case SET_SHOWOPTIONID:
            return { ...state, showOptionID: action.payload }
        case SET_SHOWREACTEMOJID:
            return { ...state, setReactEmojID: action.payload }
        default:
            throw new Error('Invalid type')
    }
}
export default reducer