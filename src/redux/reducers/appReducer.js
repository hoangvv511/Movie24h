import { CAN_SHOW_MESS, START_RESUME } from '../actions/type'

const initialState = {
    user: null,
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
                acceptResume: action.canStart
            }
        }
        default:
            return state;
    }
}
export default AppReducer