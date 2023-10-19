import { CommunicationService } from "./communication-service";
import { UserLoginForm, UserBase } from "../models/user-params";
import { AxiosRequestConfig } from "axios";

/**
 * 認証関連API通信クラス
 */
export class AuthCommunicationService extends CommunicationService {

  /**
   * ログインAPI
   * @param data ログインbody
   */
  public create<T=UserLoginForm>(data: T): Promise<UserBase> {
    const config: AxiosRequestConfig<T> = {
      url: 'login',
      method: 'post',
      data,
    }
    return this.request<UserBase>(config)
  }

  /**
   * ログアウトAPI
   */
  public destroy(): Promise<void> {
    const config: AxiosRequestConfig = {
      url: 'logout',
      method: 'delete',
    }
    return this.request<void>(config)
  }

  /**
   * セッション確認API
   */
  public session(): Promise<UserBase> {
    const config: AxiosRequestConfig = {
      url: 'session',
      method: 'post',
    }
    return this.request<UserBase>(config)
  }

}
