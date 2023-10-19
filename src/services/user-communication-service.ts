import { CommunicationService } from "./communication-service";
import {
  UserAddForm,
  UserBase,
  UserEditForm,
  UserInfo,
  UserList
} from "../models/user-params";
import { AxiosRequestConfig } from "axios";

/**
 * ユーザ関連API通信クラス
 */
export class UserCommunicationService extends CommunicationService {

  /**
   * ユーザ登録API
   * @param data ユーザ登録body
   */
  public create<T=UserAddForm>(data: T): Promise<UserBase> {
    const config: AxiosRequestConfig<T> = {
      url: 'user',
      method: 'post',
      data,
    }
    return this.request<UserBase>(config)
  }

  /**
   * ユーザ詳細取得API
   * @param user_id ユーザID
   */
  public show(user_id: number): Promise<UserInfo> {
    const config: AxiosRequestConfig = {
      url: `user/${user_id}`,
      method: 'get',
    }
    return this.request<UserInfo>(config)
  }

  /**
   * ユーザ一覧取得API
   */
  public index(): Promise<UserList> {
    const config: AxiosRequestConfig = {
      url: 'users',
      method: 'get',
    }
    return this.request<UserList>(config)
  }

  /**
   * ユーザ更新API
   * @param data ユーザ更新body
   */
  public update<T=UserEditForm>(data: T): Promise<void> {
    const config: AxiosRequestConfig<T> = {
      url: 'user',
      method: 'put',
      data,
    }
    return this.request<void>(config)
  }

}
