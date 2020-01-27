import axios, { AxiosResponse } from 'axios';
import { Record } from '../models';
import { BASE_PATH, RECORDS } from '../base';

export const get = (): Promise<AxiosResponse<Record[]>> => {
    const requestUrl = `${BASE_PATH}${RECORDS}`;
    return axios.get(requestUrl);
}

export const getById = (id: number): Promise<AxiosResponse<Record>> => {
    const requestUrl = `${BASE_PATH}${RECORDS}/${id}`;
    return axios.get(requestUrl);
}

export const post = (data: Record): Promise<AxiosResponse<Record>> => {
    const requestUrl = `${BASE_PATH}${RECORDS}`;
    return axios.post(requestUrl, data);
}

export const put = (id: number, data: Record): Promise<AxiosResponse<Record>> => {
    const requestUrl = `${BASE_PATH}${RECORDS}/${id}`;
    return axios.put(requestUrl, data);
}

export const remove = (id: number): Promise<AxiosResponse<Record>> => {
    const requestUrl = `${BASE_PATH}${RECORDS}${id}`;
    return axios.delete(requestUrl);
}

export default {
    get,
    getById,
    post,
    put,
    remove,
}
