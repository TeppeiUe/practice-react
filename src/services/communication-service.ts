import axios, { AxiosInstance } from "axios";
import { baseURL } from "../const";

export class CommunicationService {
  protected axios: AxiosInstance;
  protected abortController = new AbortController();

  constructor() {
    const { signal } = this.abortController;
    this.axios = axios.create({
      baseURL,
      signal
    });
  }

  /**
   * Abort Communication for StrictMode
   * If StrictMode is enabled, the component renders twice.
   */
  public abort() {
    this.abortController.abort();
  }
}
