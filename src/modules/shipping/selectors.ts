import {RootState} from "../root/store";
import {ShippingItem} from "./types";

export const shippingSelector = (state: RootState) => state.shipping.shippingList as ShippingItem[]
export const getShippingLoadingSelector = (state: RootState) => state.shipping.shippingListLoading as boolean
