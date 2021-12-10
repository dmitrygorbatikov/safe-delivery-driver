export enum ManagerEnumTypes {
    GET_DRIVER_PROFILE_REQUEST = 'GET_DRIVER_PROFILE_REQUEST',
    GET_DRIVER_PROFILE_RESPONSE = 'GET_DRIVER_PROFILE_RESPONSE',
    GET_DRIVER_PROFILE_ERROR = 'GET_DRIVER_PROFILE_ERROR',
}

export interface DriverProfile {
    _id: string
    name: string
    surname: string
    email: string
    password: string
    role: string
    registerDate: number
}