/**
 * Created by MChao on 2017/9/8.
 */
import axios from 'axios'

const options = {}
if (process.env.NODE_ENV === 'production') {
    options.baseURL = 'http://ews.500.com'
} else {
    options.baseURL = '/ews'
}
const _axios = axios.create(options)

const ajax = function (url, config) {
    return _axios.get(url, config).then((response) => {
        if (response.status === 200) {
            return response.data
        } else {
            throw new Error(response.message)
        }
    }).then(resp => {
        if (resp.status === '100') {
            return resp.data
        } else {
            const error = new Error(resp.message)
            error.code = resp.status
            throw error
        }
    })
}
ajax.get = function (url, config) {
    return _axios.get(url, config).then((response) => {
        if (response.status === 200) {
            return response.data
        } else {
            throw new Error(response.message)
        }
    }).then(resp => {
        if (resp.status === '100') {
            return resp.data
        } else {
            const error = new Error(resp.message)
            error.code = resp.status
            throw error
        }
    })
}
ajax.post = function (url, param, config) {
    return _axios.post(url, param, config).then((response) => {
        if (response.status === 200) {
            return response.data
        } else {
            throw new Error(response.message)
        }
    }).then(resp => {
        if (resp.status === '100') {
            return resp.data
        } else {
            const error = new Error(resp.message)
            error.code = resp.status
            throw error
        }
    })
}
export default ajax
