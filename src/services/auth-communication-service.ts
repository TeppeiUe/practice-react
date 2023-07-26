import { CommunicationService } from "./communication-service";
import { authenticationApi } from "../const";
import { UserLoginForm, UserBase } from "../models/user-params";
import { AxiosError } from "axios";
import { ErrorResponse } from "../models/shared-params";

export class AuthCommunicationService extends CommunicationService {
  
  public create(data: UserLoginForm): Promise<UserBase> {
    const option = authenticationApi.create;
    
    return new Promise((resolve, reject) => {
      this.axios<UserBase>({ ...option, data })
      .then(res => resolve(res.data))
      .catch((e: AxiosError<ErrorResponse>) => {
        if (e.isAxiosError) {
          reject(e.response?.data);
        }
      });
    })
  }

  public destroy(): Promise<void> {
    const option = authenticationApi.destroy;

    return new Promise((resolve, reject) => {
      this.axios(option)
      .then(() => resolve())
      .catch((e: AxiosError<ErrorResponse>) => {
        if (e.isAxiosError) {
          reject(e.response?.data);
        }
      });
    })
  }

  public session(): Promise<UserBase> {
    const option = authenticationApi.session;
    
    return new Promise((resolve, reject) => {
      this.axios<UserBase>(option)
      .then(res => resolve(res.data))
      .catch((e: AxiosError<ErrorResponse>) => {
        if (e.isAxiosError) {
          reject(e.response?.data);
        }
      });
    })
  }

}
