import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { ApiConfig, ApiResponse } from './types/api.type';
import { authStore } from './store/auth.store';

class ApiService {
  private _axiosInstance: AxiosInstance;

  constructor() {
    this._axiosInstance = axios.create({
      headers: { 'Content-Type': 'application/json' },
    });
    this._setupInterceptors();
  }

  public async request<ResponsePayload, RequestBody = undefined>(
    config: ApiConfig<RequestBody>,
  ): Promise<ApiResponse<ResponsePayload>> {
    try {
      return await this._axiosInstance.request<
        ResponsePayload,
        ApiResponse<ResponsePayload>,
        RequestBody
      >(config);
    } catch (error) {
      return this._handleError(error as AxiosError);
    }
  }

  private _setupInterceptors(): void {
    this._axiosInstance.interceptors.request.use(
      (config) => this._handleRequestInterceptor(config),
      (error) => Promise.reject(error),
    );
  }

  private _handleRequestInterceptor(
    config: InternalAxiosRequestConfig,
  ): InternalAxiosRequestConfig {
    const baseApi = authStore.getState().baseApi;
    const normalizedBase = this._normalizeUrl(baseApi || '');
    const normalizedUrl = this._normalizeUrl(config.url || '', true);

    config.url = normalizedUrl ? `${normalizedBase}/${normalizedUrl}` : normalizedBase;
    delete config.baseURL;

    return config;
  }

  private _normalizeUrl(url: string, isRelative: boolean = false): string {
    if (isRelative) {
      return url.replace(/^\/+/, '');
    }
    return url.replace(/\/+$/, '');
  }

  private _handleError(error: AxiosError): Promise<never> {
    console.error('❌ API Error:', error.message);
    console.error('   Request URL:', error.config?.url);
    return Promise.reject(error);
  }
}

export const apiService = new ApiService();

export const apiCall = async <ResponsePayload, RequestBody = undefined>(
  apiConfig: ApiConfig<RequestBody>,
): Promise<ApiResponse<ResponsePayload>> => {
  return apiService.request<ResponsePayload, RequestBody>(apiConfig);
};
