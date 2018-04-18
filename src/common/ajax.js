/**
 * Created by zhangzc on 2018/4/18
 **/
import axios from 'axios'

const options = {}
if (process.env.NODE_ENV === 'production') {
  options.baseURL = 'http://c.m.500.com'
} else {
  options.baseURL = '/dev'
}

const _axios = axios.create(options)

const ajax = function (url, config = {ignore: true}) {
  config.withCredentials = true
  config.timeout = config.timeout || 5000
  return _axios.get(url, config).then((response) => {
    if (response.status === 200) {
    return response.data
  } else if (config.ignore) {
    return {data: {}}
  } else {
    throw new Error(response.message)
  }
}).then(resp => {
    if(!resp.status) return resp              // 如果不是ews接口 没有status直接返回
  if (resp.status === '100' || config.ignore) {
    if (!resp.data) {
      console.warn('服务端异常， 没有返回数据，' + url)
      return {}
    }
    return resp.data
  } else {
    const error = new Error(resp.message)
    error.code = resp.status
    throw error
  }
}, (err) => {
    console.error('接口访问异常：' + url)
    console.error(err.message)
    if (config.ignore) {
      return {}
    } else {
      throw err
    }
  })
}
ajax.get = function (url, config = {ignore: true}) {
  config.withCredentials = true
  config.timeout = config.timeout || 5000
  return _axios.get(url, config).then((response) => {
    if (response.status === 200) {
    return response.data
  } else if (config.ignore) {
    return {data: {}}
  } else {
    throw new Error(response.message)
  }
}).then(resp => {
    if(!resp.status) return resp              // 如果不是ews接口 没有status直接返回
  if (resp.status === '100' || config.ignore) {
    if (!resp.data) {
      console.warn('服务端异常， 没有返回数据，' + url)
      return {}
    }
    return resp.data
  } else {
    const error = new Error(resp.message)
    error.code = resp.status
    throw error
  }
}, (err) => {
    console.error('接口访问异常：' + url)
    console.error(err.message)
    if (config.ignore) {
      return {}
    } else {
      throw err
    }
  })
}
ajax.post = function (url, param, config = {ignore: true}) {
  config.withCredentials = true
  config.timeout = config.timeout || 5000
  return _axios.post(url, param, config).then((response) => {
    if (response.status === 200) {
    return response.data
  } else if (config.ignore) {
    return {data: {}}
  } else {
    throw new Error(response.message)
  }
}).then(resp => {
    if(!resp.status) return resp              // 如果不是ews接口 没有status直接返回
  if (resp.status === '100' || config.ignore) {
    if (!resp.data) {
      console.warn('服务端异常， 没有返回数据，' + url)
      return {}
    }
    return resp.data
  } else {
    const error = new Error(resp.message)
    error.code = resp.status
    throw error
  }
}, (err) => {
    console.error('接口访问异常：' + url)
    console.error(err.message)
    if (config.ignore) {
      return {}
    } else {
      throw err
    }
  })
}
export default ajax
