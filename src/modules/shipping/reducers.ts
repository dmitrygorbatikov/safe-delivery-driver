import { AnyAction } from 'redux'
import {ShippingEnumTypes, ShippingItem} from "./types";

interface ShippingState {
    error?: string
    shippingListLoading: boolean
    shippingList: ShippingItem[]
}

const initState: ShippingState = {
    shippingListLoading: false,
    shippingList: [],
}

function shippingReducer(state = initState, action: AnyAction): ShippingState {
    switch (action.type) {
        case ShippingEnumTypes.GET_SHIPPING_REQUEST:
            return {
                ...state,
                shippingListLoading: true,
            }
        case ShippingEnumTypes.GET_SHIPPING_RESPONSE:
            return {
                ...state,
                shippingList: action.payload,
                shippingListLoading: false,
            }
        case ShippingEnumTypes.GET_SHIPPING_ERROR:
            return {
                ...state,
                shippingListLoading: false,
                error: action.payload,
            }
        case ShippingEnumTypes.PUT_SEND_SHIPPING_REQUEST:
            return {
                ...state,
            }
        case ShippingEnumTypes.PUT_SEND_SHIPPING_RESPONSE:
            return {
                ...state,
                shippingList: action.payload,
            }
        case ShippingEnumTypes.PUT_SEND_SHIPPING_ERROR:
            return {
                ...state,
                error: action.payload,
            }
        case ShippingEnumTypes.PUT_DELIVERED_SHIPPING_REQUEST:
            return {
                ...state,
            }
        case ShippingEnumTypes.PUT_DELIVERED_SHIPPING_RESPONSE:
            return {
                ...state,
                shippingList: action.payload,
            }
        case ShippingEnumTypes.PUT_DELIVERED_SHIPPING_ERROR:
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state
    }
}
export default shippingReducer
