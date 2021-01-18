/**
 * @description server api axiosHandler
 */
const axios = require('axios');
//const utils = require('../utils')
//const logger = utils.logger
axios.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // if (error && error.response) {
        //   console.log(`Network Fetch Error ${err.response.status}`)
        // } else {
        //   console.log('Internal Server Error')
        // }
        return Promise.resolve(error.response);
    }
);
const checkStatus = (response) => {
    if (
        response &&
        (response.status === 200 ||
            response.status === 304 ||
            response.status === 400)
    ) {
        return response;
    }
    return {
        status: 404,
        requestUrl: response.config.url,
        msg: 'network fetch error',
    };
};

const checkCode = (res) => {
    if (res.status === 404) {
        console.warn(`${res.msg} - ${res.requestUrl}`);
    }
    //console.log('回應', res);
    return res;
};

/**
 * @description axios export handler
 * @exports api
 * @param {object} options axios 對應參數
 */
const axiosHandler = (options) => {
    const method = options.method.toLocaleLowerCase();
    switch (method) {
        case 'post':
            return axios({
                method: 'POST',
                url: options.url,
                data: options.data,
                timeout: options.timeout || 30 * 1000,
                maxContentLength: options.maxContentLength || 10 * 1024 * 1024,
                maxBodyLength: options.maxBodyLength || 10 * 1024 * 1024,
                headers: options.headers || {
                    'X-Requested-With': 'XMLHttpRequest',
                    'content-type': 'application/json;charset=UTF-8',
                },
            })
                .then((response) => {
                    console.log(response);
                    return checkStatus(response);
                })
                .then((res) => {
                    return checkCode(res);
                });

        case 'get':
        default:
            return axios({
                method: 'GET',
                url: options.url,
                timeout: options.timeout || 30 * 1000,
                headers: options.headers || {
                    'X-Requested-With': 'XMLHttpRequest',
                    'content-type': 'application/json;charset=UTF-8',
                },
            })
                .then((response) => {
                    return checkStatus(response);
                })
                .then((res) => {
                    return checkCode(res);
                });
    }
};

module.exports = axiosHandler;
