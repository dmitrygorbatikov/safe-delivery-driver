import { AnyAction } from 'redux'
import {DriverProfile, ManagerEnumTypes} from "./types";

interface StoragesState {
    error?: string
    profileLoading: boolean
    profile?: DriverProfile
}

const initState: StoragesState = {
    profileLoading: false,
}

function driverReducer(state = initState, action: AnyAction): StoragesState {
    switch (action.type) {
        case ManagerEnumTypes.GET_DRIVER_PROFILE_REQUEST:
            return {
                ...state,
                profileLoading: true,
            }
        case ManagerEnumTypes.GET_DRIVER_PROFILE_RESPONSE:
            return {
                ...state,
                profile: action.payload,
                profileLoading: false,
            }
        case ManagerEnumTypes.GET_DRIVER_PROFILE_ERROR:
            return {
                ...state,
                profileLoading: false,
                error: action.payload,
            }
        default:
            return state
    }
}
export default driverReducer
