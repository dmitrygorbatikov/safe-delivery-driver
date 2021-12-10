import {AuthEnumTypes, LanguageEnum, LoginData} from "./types";
import {Dispatch} from "redux";
import AuthService from "../../services/auth.service";

export const loginRequest = () => {

    return {
        type: AuthEnumTypes.LOGIN_REQUEST,
    }
}

export const loginResponse = (token: string) => {
    localStorage.setItem('token', token)
    return {
        type: AuthEnumTypes.LOGIN_RESPONSE,
        payload: token,
    }
}

export const loginError = (error: string | undefined) => {
    return {
        type: AuthEnumTypes.LOGIN_ERROR,
        payload: error,
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    return {
        type: AuthEnumTypes.LOGOUT,
    }
}
export const logoutUser = () => {
    return (dispatch: Dispatch) => {
        dispatch(logout())
    }
}


export const login = (data: LoginData) => {
    return async (dispatch: Dispatch) => {
        dispatch(loginRequest())
        const res = await AuthService.login(data)
        console.log(res)
        if (res.error) {
            dispatch(loginError(res.error))
            logoutUser()
        } else if (res.token !== undefined) {
            loginError(undefined)
            dispatch(loginResponse(res.token))
        }
    }
}

export const changeLang = (language: LanguageEnum) => {
    localStorage.setItem('lang', language)
    return {
        type: AuthEnumTypes.CHANGE_LANGUAGE,
        payload: language
    }
}