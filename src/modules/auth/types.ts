export enum AuthEnumTypes {
    LOGIN_REQUEST = 'LOGIN_REQUEST',
    LOGIN_RESPONSE = 'LOGIN_RESPONSE',
    LOGIN_ERROR = 'LOGIN_ERROR',
    CHANGE_LANGUAGE = 'CHANGE_LANGUAGE',

    LOGOUT = 'LOGOUT',
}

export interface LoginData {
    email: string
    password: string
}

export enum LanguageEnum {
    'eng' = 'eng',
    'ua' = 'ua'
}