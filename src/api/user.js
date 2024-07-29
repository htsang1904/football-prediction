import {api} from '../configs';
import {ApiClient} from "../services/client";


let client = new ApiClient(api.base_url);

export const userApi = {
    login(data) {
        return client.post(`/game-user/login`, data)
    },
    register(data) {
        return client.post(`/game-user/register`, data)
    },
    updateTickets(data) {
        return client.post(`/game-user/update-tickets`, data)
    },
    updateCoins(data) {
        return client.post(`/game-user/update-coins`, data)
    },
};