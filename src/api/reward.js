import {api} from '../configs';
import {ApiClient} from "../services/client";


let client = new ApiClient(api.base_url);

export const rewardApi = {
    getData() {
        return client.get(`/reward/get-reward-list`)
    }
};