import axios, { AxiosRequestConfig } from 'axios';
import { GRAPH_ENDPOINT } from './const';

export const AXIOS_INSTANCE = axios.create({ baseURL: GRAPH_ENDPOINT });

export const api = <T>(config: AxiosRequestConfig): Promise<T> => {
	return AXIOS_INSTANCE(config).then(({ data }) => data);
};

export default api;
