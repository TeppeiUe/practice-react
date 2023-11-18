import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { createAxiosDefaults } from "../const";
import { ErrorResponse } from "../models/shared-params";
import { ResponseState } from "./response-context-service";

/**
 * API通信ベースクラス
 */
export class CommunicationService {
  protected axios: AxiosInstance;
  protected abortController = new AbortController();

  constructor() {
    const { signal } = this.abortController;
    const axiosInstance = axios.create({
      ...createAxiosDefaults,
      signal,
    });
    axiosInstance.interceptors.response.use(
      res => {
        console.log(`[request success] ${JSON.stringify(res.data)}`);
        return res;
      },
      e => {
        console.error(`[request failure] ${e}`);
        return Promise.reject(e);
      }
    );
    this.axios = axiosInstance;
  }

  /**
   * レスポンス状態取得
   * @param e
   * @returns レスポンスの状態
   */
  public getResponseState(e: AxiosResponse<ErrorResponse>) {
    // not AxiosError or request cancel
    if(e === undefined) {
      return;
    } else {
      const { message } = e.data;
      const responseState = new ResponseState();
      responseState.severity = 'error';
      responseState.message = message;
      return responseState;
    }
  }

  /**
   * APIリクエスト
   * @param config
   */
  protected async request<T>(config: AxiosRequestConfig){
    return await this.axios<T>({ ...config })
      .then(res => res.data)
      .catch(e => Promise.reject(e?.response));
  }

  /**
   * Abort Communication for StrictMode
   * If StrictMode is enabled, the component renders twice.
   */
  public abort() {
    this.abortController.abort();
  }
}
