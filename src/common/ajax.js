/**
 * Created by lichun on 2017/5/10.
 */
import axios from 'axios'

const errorUrl = 'http://m.sports.baofeng.com/v2.0/data/ball/match/nodata'

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
            window.location = errorUrl
            throw new Error(response.message)
        }
    }).then(resp => {
        if (resp.status === '100') {
            return resp.data
        } else {
            window.location = errorUrl
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
            window.location = errorUrl
            throw new Error(response.message)
        }
    }).then(resp => {
        if (resp.status === '100') {
            return resp.data
        } else {
            window.location = errorUrl
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
            window.location = errorUrl
            throw new Error(response.message)
        }
    }).then(resp => {
        if (resp.status === '100') {
            return resp.data
        } else {
            window.location = errorUrl
            const error = new Error(resp.message)
            error.code = resp.status
            throw error
        }
    })
}
export default ajax
