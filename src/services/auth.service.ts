import axios from 'axios'
import {LoginData} from "../modules/auth/types";

class AuthService {
    private static apiUrl = 'http://localhost:5000/driver'

    public static login(data: LoginData) {
        return axios
            .post(`${this.apiUrl}/login`, data, {})
            .then((res) => {
                const token: string = res.data.token
                return res.data
            })
            .catch((err) => {})
    }
}

export default AuthService
