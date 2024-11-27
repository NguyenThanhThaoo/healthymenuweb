import {
    SET_COURSES,
    SET_TOPICS,
    SET_COURSEDETAIL,
    SET_ACTIVE,
    SET_FIRSTID,
    SET_LASTID,
    SET_VALUETAKENOTE,
    SET_CURRENTTIMEVIDEOPLAY,
    SET_TOTALTIME,
    SET_FOUCESTIME,
    PLAYVIDEO,
    PLAYING,
    HASPLAYED,
    ACTIVETAKENOTE,
    ACTIVECREATETAKENOTE
} from './constance'


//inital
export const initialState = {
    dataCourses: [],
    dataTopics: {},
    courseDetail: {},
    active: '',
    firstID: '',
    lastID: '',
    valueTakeNote: '',
    currentTimeVideoPlay: '00:00',
    foucesTime: 0,
    totalTimeVideo: null,
    playvideo: false,
    playing: false,
    hasPlayed: false,
    activeTakeNote: false,
    activeCreateTakeNote: false
}

//reducer
const reducer = (state, action) => {
    switch (action.type) {
        case SET_COURSES:
            return { ...state, dataCourses: [...action.payload] }
        case SET_TOPICS:
            return { ...state, dataTopics: { ...action.payload } }
        case SET_COURSEDETAIL:
            return { ...state, courseDetail: { ...action.payload } }
        case SET_ACTIVE:
            return { ...state, active: action.payload }
        case SET_FIRSTID:
            return { ...state, firstID: action.payload }
        case SET_LASTID:
            return { ...state, lastID: action.payload }
        case SET_CURRENTTIMEVIDEOPLAY:
            return { ...state, currentTimeVideoPlay: action.payload || state.currentTimeVideoPlay }
        case SET_VALUETAKENOTE:
            return { ...state, valueTakeNote: action.payload }
        case SET_TOTALTIME:
            return { ...state, totalTimeVideo: action.payload }
        case SET_FOUCESTIME:
            return { ...state, foucesTime: action.payload }
        case PLAYVIDEO:
            return { ...state, playvideo: action.payload }
        case HASPLAYED:
            return { ...state, hasPlayed: action.payload }
        case PLAYING:
            return { ...state, playing: !state.playing }
        case ACTIVETAKENOTE:
            return { ...state, activeTakeNote: !state.activeTakeNote }
        case ACTIVECREATETAKENOTE:
            return { ...state, activeCreateTakeNote: !state.activeCreateTakeNote }
        default:
            throw new Error('invalid type')
    }
}
export default reducer