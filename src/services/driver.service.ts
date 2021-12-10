
import axios from 'axios'

class DriverService {
    private static apiUrl = 'http://localhost:5000/driver'

    public static getProfile() {
        return axios
            .get(`${this.apiUrl}/profile`, {
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

    public static editProfile(body: {name: string, surname: string}) {
        return axios
            .put(this.apiUrl, {
                name: body.name,
                surname: body.surname
            },{
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

}

export default DriverService
