import { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

export type ApiConfig<D> = AxiosRequestConfig<D> & {
  method: Method;
};

export type ApiResponse<T> = AxiosResponse<T>;
