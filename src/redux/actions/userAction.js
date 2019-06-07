import { START_RESUME, CAN_SHOW_MESS, SAVE_USER } from '../actions/type'

export const startResume = (canStart) => {
    return {
        type: START_RESUME,
        canStart
    }
}

export const canShowMess = (isShow, time) => {
    return {
        type: CAN_SHOW_MESS,
        isShow,
        time
    }
}

export const saveUser = user => {
    return {
        type: SAVE_USER,
        user
    }
}



