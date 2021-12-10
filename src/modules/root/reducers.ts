import { combineReducers } from 'redux'
import authReducer from "../auth/reducers";
import shippingReducer from "../shipping/reducers";
import driverReducer from "../driver/reducers";

const rootReducer = combineReducers({
    auth: authReducer,
    driver: driverReducer,
    shipping: shippingReducer
})

export default rootReducer