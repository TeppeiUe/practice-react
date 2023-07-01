import { UserBase } from "./user-params";

/** basic response for getting tweet list */
export interface TweetList {
  tweets: TweetBase[] ;
}

/** basic response for getting tweet information */
export interface TweetInfo {
  tweet: TweetBase | null;
}

/** tweet information */
export interface TweetBase {
  id: number;
  message: string;
  user_id: number;
  created_at: Date;
  user?: UserBase;
  favorites?: UserBase[] ;
}