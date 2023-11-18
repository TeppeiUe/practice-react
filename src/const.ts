import { CreateAxiosDefaults } from "axios";


const createAxiosDefaults: CreateAxiosDefaults = {
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
}

/** フォローAPI */
const followApi = {
  create: {
    url: 'user/:user_id/following',
    method: 'post',
    withCredentials: true,
  },
  index: {
    url: 'user/:user_id/followings',
    method: 'get',
  },
  followers: {
    url: 'user/:user_id/followers',
    method: 'get',
  },
  destroy: {
    url: '/user/:user_id/following',
    method: 'delete',
    withCredentials: true,
  },
};

/** お気に入りAPI */
const favoriteApi = {
  create: {
    url: 'tweet/:tweet_id/favorite',
    method: 'post',
    withCredentials: true,
  },
  index: {
    url: 'tweet/:tweet_id/favorites',
    method: 'get',
  },
  destroy: {
    url: 'tweet/:tweet_id/favorite',
    method: 'delete',
    withCredentials: true,
  },
};

export {
  createAxiosDefaults,
  followApi,
  favoriteApi,
}
