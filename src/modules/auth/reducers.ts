import { AnyAction } from 'redux'
import {AuthEnumTypes, LanguageEnum} from "./types";

interface AuthState {
    token?: string | null
    error?: string
    authLoading: boolean
    language: string
}

const initState: AuthState = {
    authLoading: false,
    token: localStorage.getItem('token') ?? '',
    language: localStorage.getItem('lang') ?? ''
}

function authReducer(state = initState, action: AnyAction): AuthState {
    switch (action.type) {
        case AuthEnumTypes.LOGIN_REQUEST:
            return {
                ...state,
                authLoading: true,
            }
        case AuthEnumTypes.LOGIN_RESPONSE:
            return {
                ...state,
                token: action.payload,
                authLoading: false,
            }
        case AuthEnumTypes.LOGIN_ERROR:
            return {
                ...state,
                authLoading: false,
                error: action.payload,
            }
        case AuthEnumTypes.LOGOUT:
            return {
                ...state,
                token: null,
            }
        case AuthEnumTypes.CHANGE_LANGUAGE:
            return {
                ...state,
                language: action.payload,
            }
        default:
            return state
    }
}
export default authReducer
