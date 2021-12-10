import axios from 'axios'
import {
    getShippingProps,
} from "../modules/shipping/types";

class ShippingService {
    private static apiUrl = 'http://localhost:5000/shipping'

    public static shipping(data: getShippingProps) {
        let getShippingUrl = `${this.apiUrl}/driver`
        if (data.search && data.search !== '') {
            getShippingUrl += `?search=${data.search}`
        }
        return axios
            .get(getShippingUrl, {
                headers: {
                    token: localStorage.getItem('token') ?? ''
                }
            })
            .then((res) => {
                return res.data
            })
            .catch((err) => {
            })
    }
    public static sendShipping(id: string) {
        return axios
            .put(`${this.apiUrl}/sent/${id}`, {},{
                headers: {
                    token: localStorage.getItem('token') ?? ''
                }
            })
            .then((res) => {
                console.log('send', res.data)
                return res.data
            })
            .catch((err) => {
            })
    }
    public static deliveredShipping(id: string) {
        return axios
            .put(`${this.apiUrl}/delivered?id=${id}`, {},{
                headers: {
                    token: localStorage.getItem('token') ?? ''
                }
            })
            .then((res) => {
                console.log('delivered', res.data)

                return res.data
            })
            .catch((err) => {
            })
    }
}

export default ShippingService
