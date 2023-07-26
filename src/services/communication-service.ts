import axios, { AxiosInstance } from "axios";
import { baseURL } from "../const";

export class CommunicationService {
  protected axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({ baseURL });
  }
  
}
