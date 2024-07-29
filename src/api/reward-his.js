import {api} from '../configs';
import {ApiClient} from "../services/client";


let client = new ApiClient(api.base_url);

export const rewardHisApi = {
    createLog(data) {
        return client.post(`/reward-history/new-request`, data)
    },
    getRewardLog(data) {
        return client.post(`/reward-history/get-reward-his`, data)
    },
};