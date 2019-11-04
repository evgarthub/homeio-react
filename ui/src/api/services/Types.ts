import axios, { AxiosResponse } from 'axios';
import { Type } from '../models';
import { BASE_PATH, TYPES } from '../base';

export const get = (): Promise<AxiosResponse<Type>> => {
    const requestUrl = `${BASE_PATH}${TYPES}`;
    return axios.get(requestUrl);
}

export const getById = (id: number): Promise<AxiosResponse<Type>> => {
    const requestUrl = `${BASE_PATH}${TYPES}/${id}`;
    return axios.get(requestUrl);
}

export const post = (data: Type): Promise<AxiosResponse<Type>> => {
    const requestUrl = `${BASE_PATH}${TYPES}`;
    return axios.post(requestUrl, data);
}

export const put = (id: number, data: Type): Promise<AxiosResponse<Type>> => {
    const requestUrl = `${BASE_PATH}${TYPES}/${id}`;
    return axios.put(requestUrl, data);
}

export const remove = (id: number): Promise<AxiosResponse<Type>> => {
    const requestUrl = `${BASE_PATH}${TYPES}/${id}`;
    return axios.delete(requestUrl);
}

export default {
    get,
    getById,
    post,
    put,
    remove,
}
