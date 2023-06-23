import { Tweet } from "./tweet-params";

/** basic response for getting user information */
export interface UserInfo {
  user: UserBase | null;
}

/** basic response for getting user list */
export interface UserList {
  users: UserBase[] ;
}

/** user information */
export interface UserBase {
  id: number;
  user_name: string;
  profile: string;
  image: string;
  created_at?: Date;
  tweets?: Tweet[] ;
}

/** user-edit form */
export interface UserEdit {
  user_name: string;
  profile: string;
  image: string;
}

/** login form */
export interface UserAuth {
  email: string;
  password: string;
}