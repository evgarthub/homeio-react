import axios, { AxiosResponse } from "axios";
import { Tariff } from "../models";
import { BASE_PATH, TARIFFS } from "../base";

export const get = async (): Promise<AxiosResponse<Tariff[]>> => {
  const requestUrl = `${BASE_PATH}${TARIFFS}`;
  return (await axios.get(requestUrl)).data;
};

export const getById = (id: number): Promise<AxiosResponse<Tariff>> => {
  const requestUrl = `${BASE_PATH}${TARIFFS}/${id}`;
  return axios.get(requestUrl);
};

export const post = (data: Tariff): Promise<AxiosResponse<Tariff>> => {
  const requestUrl = `${BASE_PATH}${TARIFFS}`;
  return axios.post(requestUrl, data);
};

export const put = (
  id: number,
  data: Tariff
): Promise<AxiosResponse<Tariff>> => {
  const requestUrl = `${BASE_PATH}${TARIFFS}/${id}`;
  return axios.put(requestUrl, data);
};

export const remove = (id: number): Promise<AxiosResponse<Tariff>> => {
  const requestUrl = `${BASE_PATH}${TARIFFS}/${id}`;
  return axios.delete(requestUrl);
};

export default {
  get,
  getById,
  post,
  put,
  remove,
};
