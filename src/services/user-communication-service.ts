import { CommunicationService } from "./communication-service";
import { userApi } from "../const";
import { UserAddForm, UserBase, UserEditForm, UserInfo, UserList } from "../models/user-params";
import { AxiosError } from "axios";
import { ErrorResponse } from "../models/shared-params";

export class UserCommunicationService extends CommunicationService {
  
  public create(data: UserAddForm): Promise<UserBase> {
    const option = userApi.create;

    return new Promise((resolve, reject) => {
      this.axios<UserBase>({ ...option, data })
      .then(res => resolve(res.data))
      .catch((e: AxiosError<ErrorResponse>) => {
        if (e.isAxiosError) {
          reject(e.response);
        }
      });
    })
  }

  public show(user_id: number): Promise<UserInfo> {
    const option = userApi.show;
    option.url.replace(':user_id', user_id.toString());

    return new Promise((resolve, reject) => {
      this.axios<UserInfo>(option)
      .then(res => resolve(res.data))
      .catch((e: AxiosError<ErrorResponse>) => {
        if (e.isAxiosError) {
          reject(e.response);
        }
      });
    })
  }

  public index(): Promise<UserList> {
    const option = userApi.index;

    return new Promise((resolve, reject) => {
      this.axios<UserList>(option)
      .then(res => resolve(res.data))
      .catch((e: AxiosError<ErrorResponse>) => {
        if (e.isAxiosError) {
          reject(e.response);
        }
      });
    })
  }

  public update(data: UserEditForm): Promise<void> {
    const option = userApi.update;

    return new Promise((resolve, reject) => {
      this.axios({ ...option, data })
      .then(() => resolve())
      .catch((e: AxiosError<ErrorResponse>) => {
        if (e.isAxiosError) {
          reject(e.response);
        }
      });
    })
  }

}
