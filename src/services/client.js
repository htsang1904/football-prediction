import axios from 'axios';
import merge from 'lodash-es/merge';
import * as config from "../configs";

/**
 * Create a new Axios client instance
 * @see https://github.com/mzabriskie/axios#creating-an-instance
 */
const getClient = (baseUrl = null) => {

    const options = {
        baseURL: baseUrl
    };

    let client = axios.create(options);

    // Add a request interceptor
    client.interceptors.request.use(function (config) {
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    client.interceptors.response.use(function (response) {
        // Do something with response data
        return response;

    }, function (error) {
        // Do something with response error
        return Promise.reject(error);
    });

    return client;
};

class ApiClient {
    constructor(baseUrl = null) {
        this.client = getClient(baseUrl);
    }

    log(method, url, data) {
        // console.log(`Send ${method.toUpperCase()} request to ${url}`, data);
    }

    get(url, conf = {}) {
        this.log('get', url);
        return this.getWithPayload(url, {}, conf)
    }

    getWithPayload(url, params, conf = {}) {
        conf = conf || {};
        conf.params = params;

        this.log('get', url, params);

        return this.client.get(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }


    delete(url, conf = {}) {
        this.log('delete', url);

        return this.client.delete(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }

    head(url, conf = {}) {
        this.log('head', url);

        return this.client.head(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }

    options(url, conf = {}) {
        this.log('options', url);

        return this.client.options(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }

    post(url, data = {}, conf = {}) {
        this.log('post', url, data);

        return this.client.post(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }

    put(url, data = {}, conf = {}) {
        this.log('put', url, data);

        return this.client.put(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }

    patch(url, data = {}, conf = {}) {
        this.log('path', url, data);

        return this.client.patch(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }
}

async function getResponse(request) {
    const response = await request;

    return response.data;
}

async function responseData(request, dataName = 'data') {
    const data = await getResponse(request);

    return data[dataName];
}

export { ApiClient, getResponse, responseData };

/**
 * Base HTTP Client
 */
export default {
    // Provide request methods with the default base_url
    get(url, conf = {}) {
        return getClient().get(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    },

    delete(url, conf = {}) {
        return getClient().delete(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    },

    head(url, conf = {}) {
        return getClient().head(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    },

    options(url, conf = {}) {
        return getClient().options(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    },

    post(url, data = {}, conf = {}) {
        return getClient().post(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    },

    put(url, data = {}, conf = {}) {
        return getClient().put(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    },

    patch(url, data = {}, conf = {}) {
        return getClient().patch(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    },
};