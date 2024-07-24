import {api} from '../configs';
import {ApiClient} from "../services/client";


let client = new ApiClient(api.base_url);

export const taskApi = {
    getData() {
        return client.get(`/task/get-tasks`)
    }
};