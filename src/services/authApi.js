import axios from 'axios'

const originUrl = "http://localhost:8080/WebPhim"

export default class AuthAPI {

    static login = (username, password) => {
        return axios.post(
            `${originUrl}/Login`,
            null,
            {
                params: {
                    username: username,
                    password: password
                },
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                }
            }
        ).then(res => res)
    }

    static register = (username, name, password) => {
        return axios.post(`${originUrl}/Register?username=${username}&password=${password}&name=${name}`).then(res => res)
    }
}

