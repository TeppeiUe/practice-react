import { AxiosRequestConfig } from "axios";
import {
  Tweet,
  TweetAddForm,
  TweetInfo,
  TweetList
} from "../models/tweet-params";
import { CommunicationService } from "./communication-service";

/**
 * ツイート関連API通信クラス
 */
export class TweetCommunicationService extends CommunicationService {

  /**
   * ツイート登録API
   * @param data ツイート登録body
   */
  public create<T=TweetAddForm>(data: T): Promise<Tweet> {
    const config: AxiosRequestConfig<T> = {
      url: 'tweet',
      method: 'post',
      data,
    }
    return this.request<Tweet>(config)
  }

  /**
   * ツイート詳細取得API
   * @param tweet_id ツイートID
   */
  public show(tweet_id: number): Promise<TweetInfo> {
    const config: AxiosRequestConfig = {
      url: `tweet/${tweet_id}`,
      method: 'get',
    }
    return this.request<TweetInfo>(config)
  }

  /**
   * ツイート一覧取得
   */
  public index(): Promise<TweetList> {
    const config: AxiosRequestConfig = {
      url: 'tweets',
      method: 'get',
    }
    return this.request<TweetList>(config)
  }

  /**
   * ツイート削除
   * @param tweet_id ツイートID
   */
  public destroy(tweet_id: number): Promise<void> {
    const config: AxiosRequestConfig = {
      url: `tweet/${tweet_id}`,
      method: 'delete',
    }
    return this.request<void>(config)
  }

}
