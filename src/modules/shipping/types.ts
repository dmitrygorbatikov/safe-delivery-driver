export enum ShippingEnumTypes {
    GET_SHIPPING_REQUEST = 'GET_SHIPPING_REQUEST',
    GET_SHIPPING_RESPONSE = 'GET_SHIPPING_RESPONSE',
    GET_SHIPPING_ERROR = 'GET_SHIPPING_ERROR',

    PUT_SEND_SHIPPING_REQUEST = 'PUT_SEND_SHIPPING_REQUEST',
    PUT_SEND_SHIPPING_RESPONSE = 'PUT_SEND_SHIPPING_RESPONSE',
    PUT_SEND_SHIPPING_ERROR = 'PUT_SEND_SHIPPING_ERROR',

    PUT_DELIVERED_SHIPPING_REQUEST = 'PUT_DELIVERED_SHIPPING_REQUEST',
    PUT_DELIVERED_SHIPPING_RESPONSE = 'PUT_DELIVERED_SHIPPING_RESPONSE',
    PUT_DELIVERED_SHIPPING_ERROR = 'PUT_DELIVERED_SHIPPING_ERROR',
}

export enum ShippingStatusEnum {
    'planned' = 'planned',
    'sent' = 'sent',
    'delivered' = 'delivered'
}

export interface ShippingItem {
    _id: string
    status: string
    driverId: string
    carId: string
    goods: ShippingGoodsProps[]
    storageFrom: string
    storageTo: string
    dispatchTime: number
    arrivalTime: number
    registerDate: number
    managerId: string
}
export interface ShippingGoodsProps {
    _id: string
    title: string
    weight: number
    storageId: string
    carId: string
    registerDate: number
    managerId: string
}
export interface getShippingProps {
    search?: string
}