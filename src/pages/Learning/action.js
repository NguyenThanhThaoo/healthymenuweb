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
    SET_FOUCESTIME
} from './constance'


export const setCourses = (payload) => {
    return {
        type: SET_COURSES,
        payload
    }
}
export const setTopic = (payload) => {
    return {
        type: SET_TOPICS,
        payload
    }
}
export const setCourseDetail = (payload) => {
    return {
        type: SET_COURSEDETAIL,
        payload
    }
}
export const setActive = (payload) => {
    return {
        type: SET_ACTIVE,
        payload
    }
}
export const setFirstID = (payload) => {
    return {
        type: SET_FIRSTID,
        payload
    }
}
export const setLastID = (payload) => {
    return {
        type: SET_LASTID,
        payload
    }
}
export const setCurrentTimeVideoPlay = (payload) => {
    return {
        type: SET_CURRENTTIMEVIDEOPLAY,
        payload
    }
}
export const setValueTakeNote = (payload) => {
    return {
        type: SET_VALUETAKENOTE,
        payload
    }
}
export const setTotalTime = (payload) => {
    return {
        type: SET_TOTALTIME,
        payload
    }
}
export const setFoucesTime = (payload) => {
    return {
        type: SET_FOUCESTIME,
        payload
    }
}