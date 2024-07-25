import {api} from '../configs';
import {ApiClient} from "../services/client";


let client = new ApiClient(api.base_url);

export const taskHisApi = {
    createLog(data) {
        return client.post(`/task-history/new-request`, data)
    },
    getTaskLog(data) {
        return client.post(`/task-history/get-his`, data)
    }
};