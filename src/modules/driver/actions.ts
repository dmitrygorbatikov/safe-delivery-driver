import {Dispatch} from "redux";
import {ManagerEnumTypes, DriverProfile} from "./types";
import DriverService from "../../services/driver.service";

export const driverRequest = () => {
    return {
        type: ManagerEnumTypes.GET_DRIVER_PROFILE_REQUEST,
    }
}

export const driverProfileResponse = (profile: DriverProfile) => {
    return {
        type: ManagerEnumTypes.GET_DRIVER_PROFILE_RESPONSE,
        payload: profile,
    }
}

export const driverProfileError = (error: string | undefined) => {
    return {
        type: ManagerEnumTypes.GET_DRIVER_PROFILE_ERROR,
        payload: error,
    }
}
export const getDriverProfile = () => {
    return async (dispatch: Dispatch) => {
        dispatch(driverRequest())
        const res = await DriverService.getProfile()
        if (res.error) {
            dispatch(driverProfileError(res.error))
        } else if (res.driver !== undefined) {
            dispatch(driverProfileResponse(res.driver))
        }
    }
}

export const editDriverProfile = (body: {name: string, surname: string}) => {
    return async (dispatch: Dispatch) => {
        const res = await DriverService.editProfile(body)
        if (res.error) {
            dispatch(driverProfileError(res.error))
        } else if (res.driver !== undefined) {
            dispatch(driverProfileResponse(res.driver))
        }
    }
}