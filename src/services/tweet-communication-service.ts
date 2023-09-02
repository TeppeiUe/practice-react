import { AxiosError } from "axios";
import { tweetApi } from "../const";
import { Tweet, TweetAddForm, TweetInfo, TweetList } from "../models/tweet-params";
import { CommunicationService } from "./communication-service";
import { ErrorResponse } from "../models/shared-params";

export class TweetCommunicationService extends CommunicationService {

  public create(data: TweetAddForm): Promise<Tweet> {
    const option = tweetApi.create;

    return new Promise((resolve, reject) => {
      this.axios({ ...option, data })
      .then(res => resolve(res.data))
      .catch((e: AxiosError<ErrorResponse>) => {
        if (e.isAxiosError) {
          reject(e.response);
        }
      });
    })
  }

  public show(tweet_id: number): Promise<TweetInfo> {
    const option = tweetApi.show;
    option.url.replace(':tweet_id', tweet_id.toString());

    return new Promise((resolve, reject) => {
      this.axios<TweetInfo>(option)
      .then(res => resolve(res.data))
      .catch((e: AxiosError<ErrorResponse>) => {
        if (e.isAxiosError) {
          reject(e.response);
        }
      });
    })
  }

  public index(): Promise<TweetList> {
    const option = tweetApi.index;

    return new Promise((resolve, reject) => {
      this.axios<TweetList>(option)
      .then(res => resolve(res.data))
      .catch((e: AxiosError<ErrorResponse>) => {
        if (e.isAxiosError) {
          reject(e.response);
        }
      });
    })
  }

  public destroy(tweet_id: number): Promise<void> {
    const option = tweetApi.destroy;
    option.url.replace(':tweet_id', tweet_id.toString());

    return new Promise((resolve, reject) => {
      this.axios(option)
      .then(() => resolve())
      .catch((e: AxiosError<ErrorResponse>) => {
        if (e.isAxiosError) {
          reject(e.response);
        }
      });
    })
  }

}
