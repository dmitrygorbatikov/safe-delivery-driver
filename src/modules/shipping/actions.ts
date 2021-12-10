import {Dispatch} from "redux";
import {getShippingProps, ShippingEnumTypes, ShippingItem} from "./types";
import ShippingService from "../../services/shipping.service";

export const shippingRequest = () => {
    return {
        type: ShippingEnumTypes.GET_SHIPPING_REQUEST,
    }
}

export const shippingResponse = (shipping: ShippingItem[]) => {
    return {
        type: ShippingEnumTypes.GET_SHIPPING_RESPONSE,
        payload: shipping,
    }
}

export const shippingError = (error: string | undefined) => {
    return {
        type: ShippingEnumTypes.GET_SHIPPING_ERROR,
        payload: error,
    }
}

/** GET */
export const getShipping = (data: getShippingProps) => {
    return async (dispatch: Dispatch) => {
        dispatch(shippingRequest())
        const res = await ShippingService.shipping(data)
        if (res.error) {
            dispatch(shippingError(res.error))
        } else if (res.shipping !== undefined) {
            dispatch(shippingResponse(res.shipping))
        }
    }
}

export const putSendShippingRequest = () => {
    return {
        type: ShippingEnumTypes.PUT_SEND_SHIPPING_REQUEST,
    }
}

export const putSendShippingResponse = (shipping: ShippingItem[]) => {
    return {
        type: ShippingEnumTypes.PUT_SEND_SHIPPING_RESPONSE,
        payload: shipping,
    }
}

export const putSendShippingError = (error: string | undefined) => {
    return {
        type: ShippingEnumTypes.PUT_SEND_SHIPPING_ERROR,
        payload: error,
    }
}

/** SEND */
export const putSendShipping = (data: { shipping: ShippingItem[]; index: number; id: string }) => {
    return async (dispatch: Dispatch) => {
        dispatch(putSendShippingRequest())
        const res = await ShippingService.sendShipping(data.id)
        if (res.error) {
            dispatch(putSendShippingError(res.error))
        } else if (res.shipping !== undefined) {
            data.shipping[data.index] = res.shipping
            const newShipping: ShippingItem[] = []
            for (let i = 0; i < data.shipping.length; i++) {
                newShipping.push(data.shipping[i])
            }
            dispatch(putSendShippingResponse(newShipping))
        }
    }
}

export const putDeliveredShippingRequest = () => {
    return {
        type: ShippingEnumTypes.PUT_DELIVERED_SHIPPING_REQUEST,
    }
}

export const putDeliveredShippingResponse = (shipping: ShippingItem[]) => {
    return {
        type: ShippingEnumTypes.PUT_DELIVERED_SHIPPING_RESPONSE,
        payload: shipping,
    }
}

export const putDeliveredShippingError = (error: string | undefined) => {
    return {
        type: ShippingEnumTypes.PUT_DELIVERED_SHIPPING_ERROR,
        payload: error,
    }
}

/** DELIVERED */
export const putDeliveredShipping = (data: { id: string, shipping: ShippingItem[], index: number }) => {
    return async (dispatch: Dispatch) => {
        dispatch(putDeliveredShippingRequest())
        const res = await ShippingService.deliveredShipping(data.id)
        if (res.error) {
            dispatch(putDeliveredShippingError(res.error))
        } else if (res.shipping !== undefined) {
            data.shipping[data.index] = res.shipping
            const newShipping: ShippingItem[] = []
            for (let i = 0; i < data.shipping.length; i++) {
                newShipping.push(data.shipping[i])
            }
            dispatch(putDeliveredShippingResponse(newShipping))
        }
    }
}