import { CAN_SHOW_MESS, START_RESUME, SAVE_USER } from '../actions/type'

const initialState = {
    user: undefined,
    timeResume: 0,
    canShowMessage: false,
    acceptResume: false
}

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case CAN_SHOW_MESS: {
            return {
                ...state,
                canShowMessage: action.isShow,
                timeResume: action.time
            }
        }
        case START_RESUME: {
            return {
                ...state,
                acceptResume: action.canStart
            }
        }
        case SAVE_USER: {
            return {
                ...state,
                user: action.user
            }
        }
        default:
            return state;
    }
}
export default AppReducer